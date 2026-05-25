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
      subject: `New Subscription for Newsletter${formData.product ? ` | ${formData.product}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; background:#0f172a; padding:32px; border-radius:16px;">
          <h2 style="color:#f97316; margin-bottom:24px;">Subscription for Newsletter</h2>
          <table style="width:100%; border-collapse:collapse; background:#020617;">
            <tr>
              <td style="padding:10px; color:#94a3b8;">Email</td>
              <td style="padding:10px; color:#f8fafc;">${formData.email}</td>
            </tr>
          </table>
          <p style="margin-top:28px; color:#64748b; font-size:13px; text-align:center;">
            Submitted on ${new Date().toLocaleString("en-IN")}
          </p>
        </div>
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
