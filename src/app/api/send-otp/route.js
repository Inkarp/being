import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Absolute path to /data/otps.json
const otpFilePath = path.join(process.cwd(),"src", "data", "otps.json");
console.log("OTP File Path:", otpFilePath);

function getRandomOtp(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Read OTP file safely
    if (!fs.existsSync(otpFilePath)) {
      return Response.json(
        { success: false, message: "OTP file not found" },
        { status: 500 }
      );
    }

    const fileData = fs.readFileSync(otpFilePath, "utf-8");
    const parsed = JSON.parse(fileData);

    if (!parsed.validOtps || parsed.validOtps.length === 0) {
      return Response.json(
        { success: false, message: "No OTPs available" },
        { status: 500 }
      );
    }

    const randomOtp = getRandomOtp(parsed.validOtps);

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Enquiry System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2F4191;">${randomOtp}</h1>
          <p>Please enter this code to verify.</p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Send OTP Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}