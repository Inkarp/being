import crypto from "crypto";
import { getDb } from "./mongodb.js";

export const OTP_EXPIRY_MINUTES = 10;
export const OTP_SEND_COOLDOWN_SECONDS = 20;
export const OTP_MAX_REQUESTS_PER_HOUR = 20;
export const OTP_MAX_ATTEMPTS = 5;

let indexesReady;

export function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeOtp(otp = "") {
  return String(otp).replace(/\D/g, "").slice(0, 6);
}

export function generateOtp() {
  return String(crypto.randomInt(100000, 1000000));
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

export async function getOtpCollection() {
  const db = await getDb();
  const collection = db.collection("emailOtps");

  indexesReady ||= Promise.all([
    collection.createIndex({ email: 1, createdAt: -1 }),
    collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);

  await indexesReady;
  return collection;
}
