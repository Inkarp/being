import crypto from "crypto";
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";
import { hashOtp, isValidEmail, normalizeEmail } from "../../library/otp";

export const runtime = "nodejs";

const OTP_EXPIRY_MINUTES = 10;
const OTP_SEND_COOLDOWN_SECONDS = 60;
const OTP_MAX_REQUESTS_PER_HOUR = 20;

let indexesReady;

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
  try {
    const { email } = await req.json();
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return Response.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    const collection = await getOtpCollection();
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const cooldownStart = new Date(now.getTime() - OTP_SEND_COOLDOWN_SECONDS * 1000);

    const recentRequest = await collection.findOne({
      email: normalizedEmail,
      createdAt: { $gte: cooldownStart },
    });

    if (recentRequest) {
      return Response.json(
        {
          success: false,
          message: `Please wait ${OTP_SEND_COOLDOWN_SECONDS} seconds before requesting another OTP.`,
        },
        { status: 429 }
      );
    }

    const requestCount = await collection.countDocuments({
      email: normalizedEmail,
      createdAt: { $gte: oneHourAgo },
    });

    if (requestCount >= OTP_MAX_REQUESTS_PER_HOUR) {
      return Response.json(
        { success: false, message: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await collection.updateMany(
      { email: normalizedEmail, usedAt: null },
      { $set: { invalidatedAt: now } }
    );

    const insertResult = await collection.insertOne({
      email: normalizedEmail,
      otpHash: hashOtp(normalizedEmail, otp),
      attempts: 0,
      usedAt: null,
      invalidatedAt: null,
      createdAt: now,
      expiresAt,
    });

    try {
      await sendEmail({
        from: `"Being India Enquiry" <${process.env.EMAIL_USER}>`,
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
    } catch (emailError) {
      await collection.deleteOne({ _id: insertResult.insertedId });
      console.error("Send OTP Email Error:", emailError);
      return Response.json(
        {
          success: false,
          message: emailError?.message || "Unable to send OTP email",
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
