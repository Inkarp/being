import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'Invalid chatbot data' },
        { status: 400 }
      );
    }

    // -----------------------------------
    // FORMAT DATA (OBJECT OR OLD ARRAY)
    // -----------------------------------

    let rows = '';
    let category = 'General';
    let product = '';

    // NEW STRUCTURED OBJECT
    if (!Array.isArray(data)) {
      category = data.Category || 'General';
      product = data.Product || '';

      rows = Object.entries(data)
        .map(
          ([key, value]) => `
          <tr>
            <td style="padding:12px; border-bottom:1px solid #1e293b; font-weight:600; color:#cbd5e1;">
              ${key}
            </td>
            <td style="padding:12px; border-bottom:1px solid #1e293b; color:#f1f5f9;">
              ${value || '-'}
            </td>
          </tr>
        `
        )
        .join('');
    }

    // OLD ARRAY FORMAT (Backward Compatibility)
    if (Array.isArray(data)) {
      rows = data
        .map(
          (item) => `
          <tr>
            <td style="padding:12px; border-bottom:1px solid #1e293b; font-weight:600; color:#cbd5e1;">
              ${item.question}
            </td>
            <td style="padding:12px; border-bottom:1px solid #1e293b; color:#f1f5f9;">
              ${item.answer}
            </td>
          </tr>
        `
        )
        .join('');
    }

    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    // -----------------------------------
    // SEND MAIL
    // -----------------------------------

    await transporter.sendMail({
      from: `"Being Website Chatbot" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      subject: `New ${category} Enquiry ${product ? `- ${product}` : ''}`,
      html: `
        <div style="font-family:Arial, sans-serif; background:#0f172a; padding:30px; border-radius:16px;">
          
          <h2 style="color:#38bdf8; margin-bottom:6px;">
            New Chatbot Inquiry
          </h2>
          
          <p style="color:#94a3b8; font-size:13px; margin-bottom:20px;">
            Received on: ${now}
          </p>

          <div style="background:#020617; border-radius:12px; overflow:hidden;">
            <table style="width:100%; border-collapse:collapse;">
              ${rows}
            </table>
          </div>

          <p style="margin-top:20px; font-size:12px; color:#64748b;">
            This message was generated automatically from the Being website chatbot.
          </p>

        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('Chatbot mail error:', err);
    return NextResponse.json(
      { error: 'Chatbot email failed' },
      { status: 500 }
    );
  }
}