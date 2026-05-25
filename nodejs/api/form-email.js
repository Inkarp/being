import { withApi, json, readJson } from "../lib/http.js";
import { buildFormEmail } from "../lib/form-email.js";
import { sendEmail } from "../lib/mailer.js";
import { getDb } from "../lib/mongodb.js";

function getIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) return forwarded.split(",")[0].trim();
  const cfIp = req.headers["cf-connecting-ip"];
  if (typeof cfIp === "string" && cfIp) return cfIp.trim();
  return "Unknown";
}

export default withApi(async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  const body = await readJson(req);
  const formType = body.formType || "Website Enquiry";
  const data = body.data && typeof body.data === "object" ? body.data : body;

  if (data.website || data.honeypot) {
    return json(res, 400, { success: false, message: "Spam detected" });
  }

  const email = data.email || data.officialEmail;
  const ip = getIp(req);
  const emailContent = buildFormEmail({ formType, data, ip });

  let insertedId = null;
  try {
    const db = await getDb();
    const result = await db.collection("emailServiceSubmissions").insertOne({
      formType,
      data,
      ip,
      createdAt: new Date(),
      status: "New",
    });
    insertedId = result.insertedId?.toString();
  } catch (error) {
    console.error("[Form Email] DB save failed:", error);
  }

  await sendEmail({
    from: `"Being India Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: process.env.COMPANY_EMAIL,
    replyTo: email || undefined,
    ...emailContent,
  });

  return json(res, 200, {
    success: true,
    insertedId,
    emailSent: true,
  });
});
