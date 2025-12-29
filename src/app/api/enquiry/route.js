import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'your-company@inkarp.com';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const formData = await request.json();

    const companyMail = {
      from: `"Inkarp Instruments" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `New Enquiry: ${formData.name} - ${formData.product}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; padding: 40px; border-radius: 20px;">
          <h2 style="color: #f97316; margin-bottom: 30px;">🆕 New Product Enquiry</h2>
          
          <div style="background: rgba(251, 146, 60, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #f97316; margin-bottom: 24px;">
            <h3 style="color: #f8fafc; margin: 0 0 12px 0;">Product Details:</h3>
            <p><strong>Model:</strong> ${formData.product}</p>
            <p><strong>Category:</strong> ${formData.category}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 24px 0; background: rgba(30, 41, 59, 0.5); border-radius: 12px; overflow: hidden;">
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Name</td><td style="padding: 12px; color: #f8fafc;">${formData.name}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Company</td><td style="padding: 12px; color: #f8fafc;">${formData.company || 'N/A'}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Email</td><td style="padding: 12px; color: #f8fafc;">${formData.email}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Phone</td><td style="padding: 12px; color: #f8fafc;">${formData.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Designation</td><td style="padding: 12px; color: #f8fafc;">${formData.designation || 'N/A'}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; border-bottom: 1px solid rgba(148, 163, 184, 0.2); color: #94a3b8;">Department</td><td style="padding: 12px; color: #f8fafc;">${formData.department || 'N/A'}</td></tr>
            <tr><td style="padding: 12px; font-weight: 600; color: #94a3b8;">City, State, Country</td><td style="padding: 12px; color: #f8fafc;">${[formData.city, formData.state, formData.country].filter(Boolean).join(', ') || 'N/A'}</td></tr>
          </table>

          <div style="background: rgba(30, 41, 59, 0.8); padding: 20px; border-radius: 12px; border-left: 4px solid #f97316; margin: 24px 0;">
            <h3 style="color: #f8fafc; margin: 0 0 12px 0;">Message:</h3>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 0;">${formData.message.replace(/\n/g, '<br>')}</p>
          </div>

          <p style="color: #64748b; font-size: 14px; margin-top: 32px; text-align: center;">
            Submitted: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(companyMail);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
