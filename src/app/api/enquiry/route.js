import { NextResponse } from 'next/server';
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";
import { buildTrackingEmailRows, normalizeTracking } from "../_utils/tracking";

export const runtime = 'nodejs';

/* ---------------- UTILITY FUNCTIONS ---------------- */

function escapeHtml(str = '') {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

/* ---------------- POST HANDLER ---------------- */

export async function POST(request) {
  try {
    const formData = await request.json();

    /* ---------------- SPAM CHECK ---------------- */
    if (formData.website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
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
      // 'officialEmail',
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
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    if (!emailRegex.test(formData.email) ) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const tracking = normalizeTracking(formData, request);

    /* ---------------- SAVE TO DATABASE ---------------- */

    const client = await clientPromise;
    const db = client.db("BeingDB"); // ⚠ replace with actual DB name

    const dbResult = await db.collection("productEnquiries").insertOne({
      leadType: "Product Enquiry",
      name: formData.name,
      company: formData.company,
      industry: formData.industry,
      designation: formData.designation,
      department: formData.department,
      phone: formData.phone,
      email: formData.email,
      officialEmail: formData.officialEmail,
      country: formData.country || "India",
      state: formData.state,
      city: formData.city,
      product: formData.product,
      category: formData.category || null,
      message: formData.message || null,

      tracking,

      status: "New",
      createdAt: new Date(),
    });

    console.log("Product Enquiry Saved:", dbResult.insertedId);

    /* ---------------- EMAIL CONTENT ---------------- */

    function row(label, value) {
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-align:left;width:35%;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;">${escapeHtml(String(value)) || '—'}</td>
      </tr>`;
    }

    function sectionHead(title) {
      return `<tr>
        <td colspan="2" style="padding:10px 12px;font-weight:bold;text-align:left;background:#f9fafb;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">${title}</td>
      </tr>`;
    }

    const mailOptions = {
      from: `"Inkarp Instruments India" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `New Product Enquiry | ${escapeHtml(formData.product)}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Product Enquiry — ${escapeHtml(formData.product)}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid #e5e7eb;">
      <tr>
        <td style="padding:20px 15px;background:#2F4191;color:white;">
          <h2 style="margin:0 0 10px;font-size:18px;color:white;">Product Enquiry</h2>
          <p style="margin:0 0 5px;font-weight:bold;color:white;">Product: ${escapeHtml(formData.product)}</p>
          <p style="margin:0 0 5px;color:white;">Category: ${escapeHtml(formData.category || 'N/A')}</p>
          <p style="margin:0;font-size:12px;color:white;">Submitted on ${new Date().toLocaleString('en-IN')}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${sectionHead('Contact Information')}
            ${row('Full Name', formData.name)}
            ${row('Company', formData.company)}
            ${row('Industry', formData.industry)}
            ${row('Designation', formData.designation)}
            ${row('Department', formData.department)}
            ${row('Phone', '+91 ' + formData.phone)}
            ${row('Email', formData.email)}
            ${sectionHead('Location Details')}
            ${row('City', formData.city)}
            ${row('State', formData.state)}
            ${row('Country', formData.country || 'India')}
            ${formData.message ? sectionHead('Message') + `<tr><td colspan="2" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(formData.message).replace(/\n/g, '<br>')}</td></tr>` : ''}
            ${sectionHead('Tracking Information')}
            ${buildTrackingEmailRows(tracking)}
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
    };

    await sendEmail(mailOptions);

    return NextResponse.json({
      success: true,
      id: dbResult.insertedId
    });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
