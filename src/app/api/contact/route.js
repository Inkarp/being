import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this runs only on Node (not Edge)
export const runtime = 'nodejs';

// Company email (receiver)
const COMPANY_EMAIL = process.env.COMPANY_EMAIL;

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // gmail apppassword
  },
});

export async function POST(request) {
  try {
    const formData = await request.json();

    const {
      name,
      company,
      industry,
      designation,
      department,
      email,
      phone,
      enquiredProduct,
      typeOfCustomer,
      purchasePlan,
      country,
      state,
      city,
      message,
    } = formData;

    // Basic validation (all required except message)
    if (
      !name ||
      !company ||
      !industry ||
      !designation ||
      !department ||
      !email ||
      !phone ||
      !enquiredProduct ||
      !typeOfCustomer ||
      !purchasePlan ||
      !country ||
      !state ||
      !city
    ) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    if (!COMPANY_EMAIL || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Email environment variables not configured' },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: `"Conatct Enquiry" <${process.env.EMAIL_USER}>`,
      to: COMPANY_EMAIL,
      replyTo: email,
      subject: `Contact Us | ${enquiredProduct}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; background:#0f172a; padding:32px; border-radius:16px;">
          <h2 style="color:#f97316; margin-bottom:24px;">
           Contact Enquiry 
          </h2>

          <table style="width:100%; border-collapse:collapse; background:#020617; border-radius:10px;">
            <tr>
              <td style="padding:10px; color:#94a3b8;">Name</td>
              <td style="padding:10px; color:#f8fafc;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Company</td>
              <td style="padding:10px; color:#f8fafc;">${company}</td>
            </tr>
             <tr>
              <td style="padding:10px; color:#94a3b8;">Industry</td>
              <td style="padding:10px; color:#f8fafc;">${industry}</td>
            </tr>
             <tr>
              <td style="padding:10px; color:#94a3b8;">Designation</td>
              <td style="padding:10px; color:#f8fafc;">${designation}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Department</td>
              <td style="padding:10px; color:#f8fafc;">${department}</td>
            </tr>          
            <tr>
              <td style="padding:10px; color:#94a3b8;">Email</td>
              <td style="padding:10px; color:#f8fafc;">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Phone</td>
              <td style="padding:10px; color:#f8fafc;">${phone}</td>
            </tr>
            <tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Enquired Product</td>
              <td style="padding:10px; color:#f8fafc;">${enquiredProduct}</td>
            </tr>
              <tr>
              <td style="padding:10px; color:#94a3b8;">Type of customer</td>
              <td style="padding:10px; color:#f8fafc;">${typeOfCustomer}</td>
            </tr>
              </tr>
              <tr>
              <td style="padding:10px; color:#94a3b8;">Purchase Plan</td>
              <td style="padding:10px; color:#f8fafc;">${purchasePlan}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Country</td>
              <td style="padding:10px; color:#f8fafc;">
                ${ country}
              </td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">State</td>
              <td style="padding:10px; color:#f8fafc;">
                ${state}
              </td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">City</td>
              <td style="padding:10px; color:#f8fafc;">
                ${city}
              </td>
            </tr>
          </table>

          <div style="margin-top:24px; background:#1e293b; padding:16px; border-radius:10px;">
            <h4 style="color:#f8fafc; margin-bottom:8px;">Message</h4>
            <p style="color:#cbd5e1; line-height:1.6;">
              ${(message || 'No message').replace(/\n/g, '<br />')}
            </p>
          </div>

          <p style="margin-top:28px; color:#64748b; font-size:13px; text-align:center;">
            Submitted on ${new Date().toLocaleString('en-IN')}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Mail Error:', error);
    return NextResponse.json(
      { error: 'Email sending failed' },
      { status: 500 }
    );
  }
}
