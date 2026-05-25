import nodemailer from "nodemailer";

const REQUIRED_ENV = ["EMAIL_USER", "EMAIL_PASS"];

function missingEnv() {
  return REQUIRED_ENV.filter((key) => !process.env[key]);
}

function getPassword() {
  return process.env.EMAIL_PASS?.replace(/\s+/g, "");
}

function getDisplayName(from = "") {
  const match = String(from).match(/^\s*"?([^"<]+?)"?\s*</);
  return match?.[1]?.trim() || "Being India";
}

function getFrom(from) {
  const address = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  return `"${getDisplayName(from)}" <${address}>`;
}

function normalizeRecipients(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export function validateEmailEnv(mailOptions = {}) {
  const missing = missingEnv();
  if ("to" in mailOptions && normalizeRecipients(mailOptions.to).length === 0) {
    missing.push("email recipient");
  }
  if (missing.length) throw new Error(`Missing email env vars: ${missing.join(", ")}`);
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 465),
    secure: String(process.env.EMAIL_SECURE || "true") !== "false",
    auth: {
      user: process.env.EMAIL_USER,
      pass: getPassword(),
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export async function sendEmail(mailOptions) {
  validateEmailEnv(mailOptions);
  const transporter = createTransporter();

  try {
    return await transporter.sendMail({
      ...mailOptions,
      from: getFrom(mailOptions.from),
    });
  } finally {
    transporter.close();
  }
}

export async function verifyEmailTransport() {
  validateEmailEnv();
  const transporter = createTransporter();

  try {
    return await transporter.verify();
  } finally {
    transporter.close();
  }
}
