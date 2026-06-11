import { NextResponse } from "next/server";
import { sendEmail } from "../../library/mailer";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.json();

    if (!formData.email) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    await sendEmail({
      from: `"Being Instruments India" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `Newsletter Subscription${formData.product ? ` | ${formData.product}` : ""}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Newsletter Subscription</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid #e5e7eb;">
      <tr>
        <td style="padding:20px 15px;background:#2F4191;color:white;">
          <h2 style="margin:0;font-size:18px;color:white;">Newsletter Subscription</h2>
          <p style="margin:5px 0 0;font-size:12px;color:white;">Submitted on ${new Date().toLocaleString("en-IN")}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-align:left;width:35%;">Email</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;">${formData.email}</td>
            </tr>
            ${formData.product ? `<tr>
              <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-align:left;width:35%;">Product</td>
              <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;">${formData.product}</td>
            </tr>` : ""}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:15px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;">
          Auto-generated from Being India website. Do not reply to this email.
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe Error:", error);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}
