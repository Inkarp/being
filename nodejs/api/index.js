import { withApi, json } from "../lib/http.js";

export default withApi(async function handler(req, res) {
  if (req.method !== "GET") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  return json(res, 200, {
    success: true,
    service: "Being Email Service",
    endpoints: [
      "GET /api/mail-health",
      "POST /api/send-otp",
      "POST /api/verify-otp",
      "POST /api/form-email",
    ],
  });
});
