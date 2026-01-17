import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // ✅ SAME AS enquiry
    pass: process.env.EMAIL_PASS,   // ✅ SAME AS enquiry
  },
});

export async function POST(request) {
  try {
    const conversation = await request.json();

    if (!Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json(
        { error: 'Invalid chatbot data' },
        { status: 400 }
      );
    }

    const rows = conversation
      .map(
        (item) => `
        <tr>
          <td style="padding:10px; color:#94a3b8;">${item.question}</td>
          <td style="padding:10px; color:#f8fafc;">${item.answer}</td>
        </tr>
      `
      )
      .join('');

    await transporter.sendMail({
      from: `"Being Website Chatbot" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      subject: 'New Chatbot Enquiry',
      html: `
        <div style="font-family:Arial; background:#0f172a; padding:24px; border-radius:14px;">
          <h2 style="color:#38bdf8;">Chatbot Conversation</h2>
          <table style="width:100%; background:#020617; border-radius:10px;">
            ${rows}
          </table>
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
