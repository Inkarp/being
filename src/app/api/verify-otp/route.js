import crypto from "crypto";
import clientPromise from "../../library/mongodb";

export const runtime = "nodejs";

const OTP_MAX_ATTEMPTS = 5;

let indexesReady;

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeOtp(otp = "") {
  return String(otp).replace(/\D/g, "").slice(0, 6);
}

function hashOtp(email, otp) {
  const secret = process.env.OTP_SECRET || process.env.EMAIL_PASS || "otp-secret";
  return crypto
    .createHash("sha256")
    .update(`${normalizeEmail(email)}:${otp}:${secret}`)
    .digest("hex");
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
    const { email, otp } = await req.json();
    const normalizedEmail = normalizeEmail(email);
    const normalizedOtp = normalizeOtp(otp);

    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return Response.json(
        { success: false, message: "Valid email required" },
        { status: 400 }
      );
    }

    if (normalizedOtp.length !== 6) {
      return Response.json(
        { success: false, message: "Valid 6-digit OTP required" },
        { status: 400 }
      );
    }

    const collection = await getOtpCollection();
    const now = new Date();

    const otpRecord = await collection.findOne(
      {
        email: normalizedEmail,
        usedAt: null,
        invalidatedAt: null,
        expiresAt: { $gt: now },
      },
      { sort: { createdAt: -1 } }
    );

    if (!otpRecord) {
      return Response.json(
        { success: false, message: "OTP expired or not found. Please request a new code." },
        { status: 400 }
      );
    }

    if ((otpRecord.attempts || 0) >= OTP_MAX_ATTEMPTS) {
      await collection.updateOne(
        { _id: otpRecord._id },
        { $set: { invalidatedAt: now } }
      );

      return Response.json(
        { success: false, message: "Too many incorrect attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    const submittedHash = hashOtp(normalizedEmail, normalizedOtp);

    if (submittedHash !== otpRecord.otpHash) {
      await collection.updateOne(
        { _id: otpRecord._id },
        { $inc: { attempts: 1 }, $set: { lastAttemptAt: now } }
      );

      return Response.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    await collection.updateOne(
      { _id: otpRecord._id, usedAt: null },
      { $set: { usedAt: now, verifiedAt: now } }
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
