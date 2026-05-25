
import { NextResponse } from 'next/server';
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";

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
      status: "New",
      createdAt: new Date(),
    });

    const mailOptions = {
      from: `"Being Instruments India" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: formData.email,
      subject: `Service Renewal Request | ${formData.product}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: auto; background:#0f172a; padding:32px; border-radius:16px;">
          
          <h2 style="color:#f97316; margin-bottom:24px;">
            🆕 New Service Renewal Request
          </h2>

          <div style="background:#1e293b; padding:16px; border-radius:10px; margin-bottom:20px;">
            <p style="color:#e5e7eb;"><strong>Product:</strong> ${formData.product}</p>
            <p style="color:#e5e7eb;"><strong>Category:</strong> ${formData.category || 'N/A'}</p>
            <p style="color:#e5e7eb;"><strong>Instrument:</strong> ${formData.instrumentName || formData.instrument || 'N/A'}</p>
            <p style="color:#e5e7eb;"><strong>Model:</strong> ${formData.selectedModel || 'N/A'}</p>
            <p style="color:#e5e7eb;"><strong>Sl.No:</strong> ${formData.serialNumber || 'N/A'}</p>
            <p style="color:#e5e7eb;"><strong>PO Date:</strong> ${formData.poDate || 'N/A'}</p>
            <p style="color:#e5e7eb;"><strong>Purchase Date:</strong> ${formData.purchaseDate || 'N/A'}</p>
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
