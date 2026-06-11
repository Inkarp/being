import { NextResponse } from "next/server";
import clientPromise from "../../library/mongodb";
import { sendEmail } from "../../library/mailer";
import { buildTrackingEmailRows, escapeHtml, normalizeTracking } from "../_utils/tracking";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 12px;color:#94a3b8;width:38%;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;color:#f8fafc;border-bottom:1px solid #1e293b;font-size:13px;word-break:break-word;">${escapeHtml(value || "N/A")}</td>
    </tr>
  `;
}

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
      typeOfCustomer,
      purchasePlan,
      state,
      city,
      message,
    } = formData;

    if (
      !name ||
      !company ||
      !industry ||
      !designation ||
      !department ||
      !email ||
      !phone ||
      !typeOfCustomer ||
      !purchasePlan ||
      !state ||
      !city
    ) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Phone must be 10 digits" }, { status: 400 });
    }

    if (!process.env.COMPANY_EMAIL) {
      return NextResponse.json(
        { error: "Email environment variables not configured" },
        { status: 500 }
      );
    }

    const tracking = normalizeTracking(formData, request);
    const client = await clientPromise;
    const db = client.db("BeingDB");

    const dbResult = await db.collection("contactEnquiries").insertOne({
      name,
      company,
      industry,
      designation,
      department,
      email,
      phone,
      typeOfCustomer,
      purchasePlan,
      state,
      city,
      message: message || null,
      ipAddress: tracking.ip,
      referrer: tracking.referrer,
      source: tracking.trafficSource,
      deviceType: tracking.deviceType,
      keyword: tracking.searchKeyword,
      timestamp: tracking.timestamp,
      tracking,
      createdAt: new Date(),
      status: "New",
    });

    await sendEmail({
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `New Enquiry | ${escapeHtml(name)} | ${escapeHtml(company)}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#0b1220;padding:26px;border-radius:12px;">
          <h2 style="color:#f97316;margin:0 0 14px;font-size:20px;">New Website Enquiry</h2>

          <table style="width:100%;border-collapse:collapse;background:#020617;border-radius:8px;overflow:hidden;font-size:13px;">
            <tbody>
              ${row("Name", name)}
              ${row("Company", company)}
              ${row("Industry", industry)}
              ${row("Designation", designation)}
              ${row("Department", department)}
              ${row("Email", email)}
              ${row("Phone", `+91 ${phone}`)}
              ${row("Type of Customer", typeOfCustomer)}
              ${row("Purchase Plan", purchasePlan)}
              ${row("Country", "India")}
              ${row("State", state)}
              ${row("City", city)}
              ${buildTrackingEmailRows(tracking)}

              <tr>
                <td style="padding:12px 14px;border-top:1px solid #1e293b;color:#94a3b8;font-weight:700;vertical-align:top;width:36%;">Message</td>
                <td style="padding:12px 14px;border-top:1px solid #1e293b;color:#cbd5e1;line-height:1.6;">${escapeHtml(message || "No message").replace(/\n/g, "<br/>")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: dbResult.insertedId }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
