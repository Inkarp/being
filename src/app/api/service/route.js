import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this runs only on Node (not Edge)
export const runtime = 'nodejs';

// Company email (receiver)
const COMPANY_EMAIL = process.env.COMPANY_EMAIL ;

// Create transporter (✅ correct method)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // gmail app password
  },
});

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
      replyTo: formData.email,
      subject: `New Product Enquiry | ${formData.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; background:#0f172a; padding:32px; border-radius:16px;">
          
          <h2 style="color:#f97316; margin-bottom:24px;">
            🆕 New Product Enquiry
          </h2>

          <div style="background:#1e293b; padding:16px; border-radius:10px; margin-bottom:20px;">
            <p style="color:#e5e7eb;"><strong>Product:</strong> ${formData.product}</p>
            <p style="color:#e5e7eb;"><strong>Category:</strong> ${formData.category || 'N/A'}</p>
          </div>

          <table style="width:100%; border-collapse:collapse; background:#020617; border-radius:10px;">
            <tr>
              <td style="padding:10px; color:#94a3b8;">Name</td>
              <td style="padding:10px; color:#f8fafc;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Company</td>
              <td style="padding:10px; color:#f8fafc;">${formData.company || 'N/A'}</td>
            </tr>
          
            <tr>
              <td style="padding:10px; color:#94a3b8;">Designation</td>
              <td style="padding:10px; color:#f8fafc;">${formData.designation || 'N/A'}</td>
            </tr>
            
            <tr>
              <td style="padding:10px; color:#94a3b8;">Phone</td>
              <td style="padding:10px; color:#f8fafc;">${formData.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Email</td>
              <td style="padding:10px; color:#f8fafc;">${formData.email}</td>
            </tr>            
            <tr>
              <td style="padding:10px; color:#94a3b8;">Department</td>
              <td style="padding:10px; color:#f8fafc;">${formData.department || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">Country</td>
              <td style="padding:10px; color:#f8fafc;">
                ${ formData.country || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style="padding:10px; color:#94a3b8;">State</td>
              <td style="padding:10px; color:#f8fafc;">
                ${ formData.state  || 'N/A'}
              </td>
            </tr>
              <tr>
              <td style="padding:10px; color:#94a3b8;">City</td>
              <td style="padding:10px; color:#f8fafc;">
                ${ formData.city || 'N/A'}
              </td>
            </tr>
             <tr>
              <td style="padding:10px; color:#94a3b8;">Application/Message</td>             
                 <td style="padding:10px; color:#f8fafc;">${formData.message || 'N/A'}</td>     
            </tr>
          </table>

          <p style="margin-top:28px; color:#64748b; font-size:13px; text-align:center;">
            Submitted on ${new Date().toLocaleString('en-IN')}
          </p>

        </div>
      `,
    };

    // Send mail
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
