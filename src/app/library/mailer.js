import nodemailer from "nodemailer";

const REQUIRED_SMTP_ENV = ["EMAIL_USER", "EMAIL_FROM", "EMAIL_PASS"];

export function validateEmailEnv(mailOptions = {}) {
  const missing = [
    ...REQUIRED_SMTP_ENV.filter((key) => !process.env[key]),
  ];

  if ("to" in mailOptions && !normalizeRecipients(mailOptions.to).length) {
    missing.push("email recipient");
  }

  if (missing.length) {
    throw new Error(`Missing email env vars: ${missing.join(", ")}`);
  }
}

function getEmailPassword() {
  return process.env.EMAIL_PASS?.replace(/\s+/g, "");
}

function normalizeRecipients(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function getDisplayName(from = "") {
  const match = String(from).match(/^\s*"?([^"<]+?)"?\s*</);
  return match?.[1]?.trim() || "Being India";
}

function getFromAddress(from) {
  const address = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  const displayName = getDisplayName(from);
  return `"${displayName}" <${address}>`;
}

function buildMailOptions(mailOptions) {
  return {
    ...mailOptions,
    from: getFromAddress(mailOptions.from),
  };
}

function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 465),
    secure: String(process.env.EMAIL_SECURE || "true") !== "false",
    auth: {
      user: process.env.EMAIL_USER,
      pass: getEmailPassword(),
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export async function sendEmail(mailOptions) {
  validateEmailEnv(mailOptions);

  const transporter = createEmailTransporter();

  try {
    return await transporter.sendMail(buildMailOptions(mailOptions));
  } finally {
    transporter.close();
  }
}

export async function verifyEmailTransport() {
  validateEmailEnv();

  const transporter = createEmailTransporter();

  try {
    return await transporter.verify();
  } finally {
    transporter.close();
  }
}
