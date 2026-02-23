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

/* ---------------- UTILITY FUNCTIONS ---------------- */

// Basic HTML escape to prevent injection
function escapeHtml(str = '') {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^\d{10}$/;

/* ---------------- POST HANDLER ---------------- */

export async function POST(request) {
  try {
    const formData = await request.json();

    /* ---------------- SPAM CHECK ---------------- */
    if (formData.website) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    /* ---------------- REQUIRED FIELDS ---------------- */
    const requiredFields = [
      'name',
      'company',
      'industry',
      'designation',
      'department',
      'phone',
      'email',
      'officialEmail',
      'state',
      'city',
      'product'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    /* ---------------- VALIDATIONS ---------------- */

    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (
      !emailRegex.test(formData.email) ||
      !emailRegex.test(formData.officialEmail)
    ) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    /* ---------------- EMAIL CONTENT ---------------- */

    const mailOptions = {
      from: `"Inkarp Instruments India" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `New Product Enquiry | ${escapeHtml(formData.product)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 720px; margin:auto; background:#0f172a; padding:32px; border-radius:16px; color:white;">
          
          <h2 style="color:#f97316; margin-bottom:24px;">
            🆕 New Product Enquiry
          </h2>

          <div style="background:#1e293b; padding:16px; border-radius:10px; margin-bottom:20px;">
            <p><strong>Product:</strong> ${escapeHtml(formData.product)}</p>
            <p><strong>Category:</strong> ${escapeHtml(formData.category || 'N/A')}</p>
          </div>

          <table style="width:100%; border-collapse:collapse; background:#020617;">
            ${generateRow("Name", formData.name)}
            ${generateRow("Company", formData.company)}
            ${generateRow("Industry", formData.industry)}
            ${generateRow("Designation", formData.designation)}
            ${generateRow("Department", formData.department)}
            ${generateRow("Phone", "+91 " + formData.phone)}
            ${generateRow("Personal Email", formData.email)}
            ${generateRow("Official Email", formData.officialEmail)}
            ${generateRow("Country", formData.country)}
            ${generateRow("State", formData.state)}
            ${generateRow("City", formData.city)}
            ${generateRow("Message", formData.message || 'N/A')}
          </table>

          <hr style="margin:30px 0; border-color:#334155;" />

          <h3 style="color:#38bdf8;">📊 Tracking Information</h3>

          <table style="width:100%; border-collapse:collapse; background:#020617;">
            ${generateRow("IP Address", formData.ipAddress)}
            ${generateRow("Source", formData.source)}
            ${generateRow("Keyword", formData.keyword)}
            ${generateRow("Device Type", formData.deviceType)}
            ${generateRow("Referrer", formData.referrer)}
            ${generateRow("Landing URL", formData.landingUrl)}
            ${generateRow("Page Path", formData.pagePath)}
            ${generateRow("UTM Source", formData.utm_source)}
            ${generateRow("UTM Medium", formData.utm_medium)}
            ${generateRow("UTM Campaign", formData.utm_campaign)}
            ${generateRow("UTM Term", formData.utm_term)}
            ${generateRow("UTM Content", formData.utm_content)}
            ${generateRow("GCLID", formData.gclid)}
            ${generateRow("FBCLID", formData.fbclid)}
            ${generateRow("Timestamp", formData.timestamp)}
          </table>

          <p style="margin-top:28px; color:#94a3b8; font-size:13px; text-align:center;">
            Submitted on ${new Date().toLocaleString('en-IN')}
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json(
      { error: 'Email sending failed' },
      { status: 500 }
    );
  }
}

/* ---------------- EMAIL ROW GENERATOR ---------------- */

function generateRow(label, value) {
  return `
    <tr>
      <td style="padding:10px; color:#94a3b8; border-bottom:1px solid #1e293b;">${label}</td>
      <td style="padding:10px; color:#f8fafc; border-bottom:1px solid #1e293b;">
        ${value ? escapeHtml(String(value)) : 'N/A'}
      </td>
    </tr>
  `;
}