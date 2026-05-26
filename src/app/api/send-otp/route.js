import crypto from "crypto";
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";
import { hashOtp, isValidEmail, normalizeEmail } from "../../library/otp";

export const runtime = "nodejs";

const OTP_EXPIRY_MINUTES = 10;
const OTP_SEND_COOLDOWN_SECONDS = 20;
const OTP_MAX_REQUESTS_PER_HOUR = 20;

let indexesReady;

function maskEmail(email = "") {
  const [name = "", domain = ""] = String(email).split("@");
  if (!name || !domain) return "invalid-email";

  const visibleName = name.length <= 2 ? `${name[0] || ""}***` : `${name.slice(0, 2)}***`;
  return `${visibleName}@${domain}`;
}

function getRequestId() {
  return crypto.randomUUID?.() || `${Date.now()}-${crypto.randomInt(1000, 9999)}`;
}

function getEmailPassLength() {
  return process.env.EMAIL_PASS?.replace(/\s+/g, "").length || 0;
}

function logSendOtp(requestId, message, data = {}) {
  console.log(`[send-otp:${requestId}] ${message}`, data);
}

function logSendOtpError(requestId, message, error, data = {}) {
  console.error(`[send-otp:${requestId}] ${message}`, {
    ...data,
    name: error?.name,
    code: error?.code,
    command: error?.command,
    responseCode: error?.responseCode,
    response: error?.response,
    message: error?.message,
    stack: error?.stack,
  });
}

function generateOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

async function getOtpCollection() {
  const client = await clientPromise;
  const collection = client.db("BeingDB").collection("emailOtps");

  indexesReady ||= Promise.all([
    collection.createIndex({ email: 1, createdAt: -1 }),
    collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);

  await indexesReady;
  return collection;
}

export async function POST(req) {
  const requestId = getRequestId();
  const startedAt = Date.now();

  logSendOtp(requestId, "Request received", {
    runtime,
    hasEmailUser: Boolean(process.env.EMAIL_USER),
    hasEmailFrom: Boolean(process.env.EMAIL_FROM),
    hasEmailPass: Boolean(process.env.EMAIL_PASS),
    emailPassLength: getEmailPassLength(),
    hasMongoUri: Boolean(process.env.MONGODB_URI),
    emailHost: process.env.EMAIL_HOST || "smtp.gmail.com",
    emailPort: Number(process.env.EMAIL_PORT || 465),
    emailSecure: String(process.env.EMAIL_SECURE || "true") !== "false",
  });

  if (!process.env.EMAIL_FROM) {
    logSendOtp(requestId, "Missing EMAIL_FROM");
    return Response.json(
      { success: false, message: "EMAIL_FROM is missing" },
      { status: 500 }
    );
  }

  if (!process.env.MONGODB_URI) {
    logSendOtp(requestId, "Missing MONGODB_URI");
    return Response.json(
      { success: false, message: "MONGODB_URI is missing" },
      { status: 500 }
    );
  }
  try {
    logSendOtp(requestId, "Parsing request body");
    const { email } = await req.json();
    const normalizedEmail = normalizeEmail(email);

    logSendOtp(requestId, "Email parsed", {
      rawEmailType: typeof email,
      normalizedEmail: maskEmail(normalizedEmail),
      isValidEmail: isValidEmail(normalizedEmail),
    });

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      logSendOtp(requestId, "Invalid email rejected", {
        normalizedEmail: maskEmail(normalizedEmail),
      });

      return Response.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    logSendOtp(requestId, "Connecting to OTP collection");
    const collection = await getOtpCollection();
    logSendOtp(requestId, "OTP collection ready");

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const cooldownStart = new Date(now.getTime() - OTP_SEND_COOLDOWN_SECONDS * 1000);

    logSendOtp(requestId, "Checking recent request cooldown", {
      email: maskEmail(normalizedEmail),
      cooldownStart: cooldownStart.toISOString(),
    });

    const recentRequest = await collection.findOne({
      email: normalizedEmail,
      createdAt: { $gte: cooldownStart },
    });

    if (recentRequest) {
      logSendOtp(requestId, "Cooldown rejected", {
        email: maskEmail(normalizedEmail),
        recentRequestId: String(recentRequest._id),
        recentRequestCreatedAt: recentRequest.createdAt?.toISOString?.(),
      });

      return Response.json(
        {
          success: false,
          message: `Please wait ${OTP_SEND_COOLDOWN_SECONDS} seconds before requesting another OTP.`,
        },
        { status: 429 }
      );
    }

    logSendOtp(requestId, "Checking hourly request count", {
      email: maskEmail(normalizedEmail),
      oneHourAgo: oneHourAgo.toISOString(),
    });

    const requestCount = await collection.countDocuments({
      email: normalizedEmail,
      createdAt: { $gte: oneHourAgo },
    });

    logSendOtp(requestId, "Hourly request count checked", {
      email: maskEmail(normalizedEmail),
      requestCount,
      maxRequests: OTP_MAX_REQUESTS_PER_HOUR,
    });

    if (requestCount >= OTP_MAX_REQUESTS_PER_HOUR) {
      logSendOtp(requestId, "Hourly rate limit rejected", {
        email: maskEmail(normalizedEmail),
        requestCount,
      });

      return Response.json(
        { success: false, message: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

    logSendOtp(requestId, "Invalidating existing unused OTP records", {
      email: maskEmail(normalizedEmail),
    });

    await collection.updateMany(
      { email: normalizedEmail, usedAt: null },
      { $set: { invalidatedAt: now } }
    );

    logSendOtp(requestId, "Inserting new OTP record", {
      email: maskEmail(normalizedEmail),
      expiresAt: expiresAt.toISOString(),
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });

    const insertResult = await collection.insertOne({
      email: normalizedEmail,
      otpHash: hashOtp(normalizedEmail, otp),
      attempts: 0,
      usedAt: null,
      invalidatedAt: null,
      createdAt: now,
      expiresAt,
    });

    logSendOtp(requestId, "OTP record inserted", {
      email: maskEmail(normalizedEmail),
      insertedId: String(insertResult.insertedId),
    });

    try {
      logSendOtp(requestId, "Sending OTP email", {
        from: maskEmail(process.env.EMAIL_FROM),
        to: maskEmail(normalizedEmail),
        subject: "Your Being India verification code",
      });

      await sendEmail({
        from: `"Being India Enquiry" <${process.env.EMAIL_FROM}>`,

        to: normalizedEmail,
        subject: "Your Being India verification code",
        text: `Your Being India verification code is ${otp}. This code expires in ${OTP_EXPIRY_MINUTES} minutes.`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;line-height:1.6;color:#111827;">
            <h2 style="margin:0 0 12px;color:#2F4191;">Email Verification</h2>
            <p style="margin:0 0 14px;">Use this OTP to verify your enquiry email address.</p>
            <div style="font-size:32px;font-weight:800;letter-spacing:6px;color:#2F4191;margin:18px 0;">
              ${otp}
            </div>
            <p style="margin:0;color:#6b7280;">This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
            <p style="margin:12px 0 0;color:#6b7280;font-size:13px;">If you did not request this, you can safely ignore this email.</p>
          </div>
        `,
      });

      logSendOtp(requestId, "OTP email sent successfully", {
        email: maskEmail(normalizedEmail),
        insertedId: String(insertResult.insertedId),
      });
    } catch (emailError) {
      logSendOtpError(requestId, "OTP email send failed", emailError, {
        email: maskEmail(normalizedEmail),
        insertedId: String(insertResult.insertedId),
      });

      await collection.deleteOne({ _id: insertResult.insertedId });

      logSendOtp(requestId, "Deleted OTP record after email failure", {
        email: maskEmail(normalizedEmail),
        insertedId: String(insertResult.insertedId),
      });

      return Response.json(
        {
          success: false,
          message: emailError?.message || "Unable to send OTP email",
        },
        { status: 502 }
      );
    }

    logSendOtp(requestId, "Request completed successfully", {
      email: maskEmail(normalizedEmail),
      durationMs: Date.now() - startedAt,
    });

    return Response.json({
      success: true,
      expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
    });
  } catch (error) {
    logSendOtpError(requestId, "Unhandled send OTP error", error, {
      durationMs: Date.now() - startedAt,
    });

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
