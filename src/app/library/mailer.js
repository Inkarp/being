import nodemailer from "nodemailer";

const REQUIRED_EMAIL_ENV = ["COMPANY_EMAIL"];
const REQUIRED_SMTP_ENV = ["EMAIL_USER", "EMAIL_PASS"];

export function validateEmailEnv() {
  const missing = [
    ...REQUIRED_EMAIL_ENV.filter((key) => !process.env[key]),
    ...(process.env.RESEND_API_KEY ? [] : REQUIRED_SMTP_ENV.filter((key) => !process.env[key])),
  ];

  if (missing.length) {
    throw new Error(`Missing email env vars: ${missing.join(", ")}`);
  }
}

function getEmailPassword() {
  return process.env.EMAIL_PASS?.replace(/\s+/g, "");
}

export async function sendEmail(mailOptions) {
  validateEmailEnv();

  if (process.env.RESEND_API_KEY) {
    return sendWithResend(mailOptions);
  }

  const transporter = createEmailTransporter();

  try {
    return await transporter.sendMail(mailOptions);
  } finally {
    transporter.close();
  }
}

export async function verifyEmailTransport() {
  validateEmailEnv();

  if (process.env.RESEND_API_KEY) {
    return verifyResendTransport();
  }

  const transporter = createEmailTransporter();

  try {
    return await transporter.verify();
  } finally {
    transporter.close();
  }
}

function createEmailTransporter() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: getEmailPassword(),
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  return transporter;
}

function getResendFromAddress() {
  return process.env.RESEND_FROM || `Being India <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
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

async function sendWithResend(mailOptions) {
  const payload = {
    from: getResendFromAddress(),
    to: normalizeRecipients(mailOptions.to),
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
  };

  const replyTo = normalizeRecipients(mailOptions.replyTo || mailOptions.reply_to);
  if (replyTo.length) payload.reply_to = replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result?.message || result?.error || `Resend API failed with ${response.status}`;
    const error = new Error(message);
    error.code = result?.name || `RESEND_${response.status}`;
    error.details = result;
    throw error;
  }

  return result;
}

async function verifyResendTransport() {
  const response = await fetch("https://api.resend.com/domains", {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    const message = result?.message || result?.error || `Resend API failed with ${response.status}`;
    const error = new Error(message);
    error.code = result?.name || `RESEND_${response.status}`;
    throw error;
  }

  return true;
}
