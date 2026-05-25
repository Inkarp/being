import { withApi, json, readJson } from "../lib/http.js";
import {
  OTP_MAX_ATTEMPTS,
  getOtpCollection,
  hashOtp,
  isValidEmail,
  normalizeEmail,
  normalizeOtp,
} from "../lib/otp.js";

export default withApi(async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  const { email, otp } = await readJson(req);
  const normalizedEmail = normalizeEmail(email);
  const normalizedOtp = normalizeOtp(otp);

  if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
    return json(res, 400, { success: false, message: "Valid email required" });
  }

  if (normalizedOtp.length !== 6) {
    return json(res, 400, { success: false, message: "Valid 6-digit OTP required" });
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
    return json(res, 400, {
      success: false,
      message: "OTP expired or not found. Please request a new code.",
    });
  }

  if ((otpRecord.attempts || 0) >= OTP_MAX_ATTEMPTS) {
    await collection.updateOne(
      { _id: otpRecord._id },
      { $set: { invalidatedAt: now } }
    );

    return json(res, 429, {
      success: false,
      message: "Too many incorrect attempts. Please request a new OTP.",
    });
  }

  if (hashOtp(normalizedEmail, normalizedOtp) !== otpRecord.otpHash) {
    await collection.updateOne(
      { _id: otpRecord._id },
      { $inc: { attempts: 1 }, $set: { lastAttemptAt: now } }
    );

    return json(res, 400, { success: false, message: "Invalid OTP" });
  }

  await collection.updateOne(
    { _id: otpRecord._id, usedAt: null },
    { $set: { usedAt: now, verifiedAt: now } }
  );

  return json(res, 200, { success: true });
});
