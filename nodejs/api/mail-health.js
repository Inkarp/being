import { withApi, json } from "../lib/http.js";
import { verifyEmailTransport } from "../lib/mailer.js";

export default withApi(async function handler(req, res) {
  if (req.method !== "GET") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  await verifyEmailTransport();

  return json(res, 200, {
    success: true,
    provider: "smtp",
    mail: "ok",
    env: {
      EMAIL_USER: Boolean(process.env.EMAIL_USER),
      EMAIL_FROM: Boolean(process.env.EMAIL_FROM),
      EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
      COMPANY_EMAIL: Boolean(process.env.COMPANY_EMAIL),
      MONGODB_URI: Boolean(process.env.MONGODB_URI),
      OTP_SECRET: Boolean(process.env.OTP_SECRET),
    },
  });
});
