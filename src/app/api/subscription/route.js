
import { NextResponse } from 'next/server';
import { sendEmail } from "../../library/mailer";

// Ensure this runs only on Node (not Edge)
export const runtime = 'nodejs';

// Company email (receiver)
const COMPANY_EMAIL = process.env.COMPANY_EMAIL ;

export async function POST(request) {
  try {
    const formData = await request.json();

    // Basic validation
    if (!formData.email || !formData.name || !formData.product) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"Being Instruments India" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
    //   replyTo: formData.email,
      subject: `New Subsription for Newsletter | ${formData.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; background:#0f172a; padding:32px; border-radius:16px;">      
          <h2 style="color:#f97316; margin-bottom:24px;">
           Subsription for Newsletter
          </h2>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Email</td>
              <td style="padding:10px; color:#f8fafc;">${formData.email}</td>
            </tr>            
          <p style="margin-top:28px; color:#64748b; font-size:13px; text-align:center;">
            Submitted on ${new Date().toLocaleString('en-IN')}
          </p>
        </div>
      `,
    };

    // Send mail
    await sendEmail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json(
      { error: 'Email sending failed' },
      { status: 500 }
    );
  }
}
