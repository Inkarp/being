
import { NextResponse } from 'next/server';
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";
import { buildTrackingEmailRows, normalizeTracking } from "../_utils/tracking";

// Ensure this runs only on Node (not Edge)
export const runtime = 'nodejs';

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

    const tracking = normalizeTracking(formData, request);
    const client = await clientPromise;
    const db = client.db("BeingDB");
    const dbResult = await db.collection("serviceRenewalEnquiries").insertOne({
      leadType: "Service Renewal Request",
      name: formData.name,
      company: formData.company || null,
      designation: formData.designation || null,
      department: formData.department || null,
      phone: formData.phone || null,
      email: formData.email,
      country: formData.country || "India",
      state: formData.state || null,
      city: formData.city || null,
      product: formData.product,
      category: formData.category || null,
      warranty: formData.warranty || null,
      instrument: formData.instrument || null,
      instrumentName: formData.instrumentName || null,
      selectedModel: formData.selectedModel || null,
      serialNumber: formData.serialNumber || null,
      poDate: formData.poDate || null,
      purchaseDate: formData.purchaseDate || null,
      message: formData.message || null,
      tracking,
      status: "New",
      createdAt: new Date(),
    });

    function row(label, value) {
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-align:left;width:35%;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;">${value ? String(value) : '—'}</td>
      </tr>`;
    }

    function sectionHead(title) {
      return `<tr>
        <td colspan="2" style="padding:10px 12px;font-weight:bold;text-align:left;background:#f9fafb;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">${title}</td>
      </tr>`;
    }

    const mailOptions = {
      from: `"Being Instruments India" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `Service Renewal Request | ${formData.product}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Service Renewal — ${formData.product}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid #e5e7eb;">
      <tr>
        <td style="padding:20px 15px;background:#2F4191;color:white;">
          <h2 style="margin:0 0 10px;font-size:18px;color:white;">Service Renewal Request</h2>
          <p style="margin:0 0 5px;font-weight:bold;color:white;">Product: ${formData.product}</p>
          <p style="margin:0;font-size:12px;color:white;">Submitted on ${new Date().toLocaleString('en-IN')}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${sectionHead('Renewal Details')}
            ${row('Product', formData.product)}
            ${row('Category', formData.category || '—')}
            ${row('Instrument', formData.instrumentName || formData.instrument || '—')}
            ${row('Model', formData.selectedModel || '—')}
            ${row('Serial Number', formData.serialNumber || '—')}
            ${row('PO Date', formData.poDate || '—')}
            ${row('Purchase Date', formData.purchaseDate || '—')}
            ${sectionHead('Contact Information')}
            ${row('Name', formData.name)}
            ${row('Company', formData.company || '—')}
            ${row('Designation', formData.designation || '—')}
            ${row('Department', formData.department || '—')}
            ${row('Phone', formData.phone || '—')}
            ${row('Email', formData.email)}
            ${sectionHead('Location Details')}
            ${row('City', formData.city || '—')}
            ${row('State', formData.state || '—')}
            ${row('Country', formData.country || 'India')}
            ${formData.message ? sectionHead('Message') + `<tr><td colspan="2" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${formData.message.replace(/\n/g, '<br>')}</td></tr>` : ''}
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

    // Send mail
    await sendEmail(mailOptions);

    return NextResponse.json({ success: true, id: dbResult.insertedId });
  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json(
      { error: 'Email sending failed' },
      { status: 500 }
    );
  }
}
