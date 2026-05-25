import crypto from "crypto";

export function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeOtp(otp = "") {
  return String(otp).replace(/\D/g, "").slice(0, 6);
}

function getOtpSecret() {
  return process.env.OTP_SECRET || process.env.EMAIL_PASS || "otp-secret";
}

export function hashOtp(email, otp) {
  return crypto
    .createHash("sha256")
    .update(`${normalizeEmail(email)}:${otp}:${getOtpSecret()}`)
    .digest("hex");
}
