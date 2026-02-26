import fs from "fs";
import path from "path";

const otpFilePath = path.join(process.cwd(),"src", "data", "otps.json");

export async function POST(req) {
  try {
    const { otp } = await req.json();

    if (!otp) {
      return Response.json(
        { success: false, message: "OTP required" },
        { status: 400 }
      );
    }

    if (!fs.existsSync(otpFilePath)) {
      return Response.json(
        { success: false, message: "OTP file not found" },
        { status: 500 }
      );
    }

    const fileData = fs.readFileSync(otpFilePath, "utf-8");
    const parsed = JSON.parse(fileData);

    if (parsed.validOtps.includes(otp)) {
      return Response.json({ success: true });
    }

    return Response.json({
      success: false,
      message: "Invalid OTP",
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}