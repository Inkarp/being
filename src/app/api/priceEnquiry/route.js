import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from "../../library/mongodb";

export const runtime = 'nodejs';

const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const GST_REGEX = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const formData = await request.json();

    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'Unknown';

    if (formData.website)
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });

    if (!GST_REGEX.test(formData.gstNumber))
      return NextResponse.json({ error: 'Invalid GST' }, { status: 400 });

    if (!/^\d{10}$/.test(formData.phone))
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });

    if (!EMAIL_REGEX.test(formData.email) ||
        !EMAIL_REGEX.test(formData.officialEmail))
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });

    /* ================= SAVE TO DATABASE ================= */

    const client = await clientPromise;
    const db = client.db("BeingDB"); // replace if different

    const dbResult = await db.collection("productPriceEnquiries").insertOne({
      leadType: "Price Enquiry",
      product: formData.product,
      price: formData.price || null,

      name: formData.name,
      company: formData.company,
      gstNumber: formData.gstNumber,
      industry: formData.industry,
      designation: formData.designation,
      department: formData.department,
      phone: formData.phone,
      email: formData.email,
      officialEmail: formData.officialEmail,
      state: formData.state,
      city: formData.city,
      message: formData.message || null,

      tracking: {
        ip,
        deviceType: formData.deviceType,
        referrer: formData.referrer,
        landingUrl: formData.landingUrl,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
        gclid: formData.gclid,
        fbclid: formData.fbclid,
      },

      /* EXTRA CRM FIELDS */
      status: "New",
      assignedTo: null,
      followUpDate: null,
      leadSource: "Website",
      priority: "Normal",
      isContacted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Price Enquiry Saved:", dbResult.insertedId);

    /* ================= EMAIL (UNCHANGED) ================= */

    await transporter.sendMail({
      from: `"Inkarp Instruments" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `New Price Enquiry | ${formData.product}`,
      html: `
        <h2>Price Enquiry</h2>

        <p><strong>Product:</strong> ${formData.product}</p>
        <p><strong>Price:</strong> ₹ ${formData.price || 'N/A'}</p>

        <hr/>

        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
        <p><strong>GST:</strong> ${formData.gstNumber}</p>
        <p><strong>Industry:</strong> ${formData.industry}</p>
        <p><strong>Designation:</strong> ${formData.designation}</p>
        <p><strong>Department:</strong> ${formData.department}</p>
        <p><strong>Phone:</strong> +91 ${formData.phone}</p>
        <p><strong>Personal Email:</strong> ${formData.email}</p>
        <p><strong>Official Email:</strong> ${formData.officialEmail}</p>
        <p><strong>State:</strong> ${formData.state}</p>
        <p><strong>City:</strong> ${formData.city}</p>
        <p><strong>Message:</strong> ${formData.message || 'N/A'}</p>

        <hr/>

        <h3>Tracking Info</h3>
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Device:</strong> ${formData.deviceType}</p>
        <p><strong>Referrer:</strong> ${formData.referrer}</p>
        <p><strong>Landing URL:</strong> ${formData.landingUrl}</p>
        <p><strong>UTM Source:</strong> ${formData.utm_source}</p>
        <p><strong>UTM Medium:</strong> ${formData.utm_medium}</p>
        <p><strong>UTM Campaign:</strong> ${formData.utm_campaign}</p>
        <p><strong>GCLID:</strong> ${formData.gclid}</p>
        <p><strong>FBCLID:</strong> ${formData.fbclid}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Price Enquiry Error:", error);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}