import { withApi, json, readJson } from "../lib/http.js";
import { sendEmail } from "../lib/mailer.js";
import {
  OTP_EXPIRY_MINUTES,
  OTP_MAX_REQUESTS_PER_HOUR,
  OTP_SEND_COOLDOWN_SECONDS,
  generateOtp,
  getOtpCollection,
  hashOtp,
  isValidEmail,
  normalizeEmail,
} from "../lib/otp.js";

export default withApi(async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  const { email } = await readJson(req);
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
    return json(res, 400, { success: false, message: "Valid email required" });
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
    return json(res, 429, {
      success: false,
      message: `Please wait ${OTP_SEND_COOLDOWN_SECONDS} seconds before requesting another OTP.`,
    });
  }

  const requestCount = await collection.countDocuments({
    email: normalizedEmail,
    createdAt: { $gte: oneHourAgo },
  });

  if (requestCount >= OTP_MAX_REQUESTS_PER_HOUR) {
    return json(res, 429, {
      success: false,
      message: "Too many OTP requests. Please try again later.",
    });
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
      from: `"Being India Enquiry" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Your Being India verification code",
      text: `Your Being India verification code is ${otp}. This code expires in ${OTP_EXPIRY_MINUTES} minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;line-height:1.6;color:#111827;">
          <h2 style="margin:0 0 12px;color:#2F4191;">Email Verification</h2>
          <p style="margin:0 0 14px;">Use this OTP to verify your enquiry email address.</p>
          <div style="font-size:32px;font-weight:800;letter-spacing:6px;color:#2F4191;margin:18px 0;">${otp}</div>
          <p style="margin:0;color:#6b7280;">This code expires in ${OTP_EXPIRY_MINUTES} minutes.</p>
        </div>
      `,
    });
  } catch (error) {
    await collection.deleteOne({ _id: insertResult.insertedId });
    throw error;
  }

  return json(res, 200, {
    success: true,
    expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
  });
});
