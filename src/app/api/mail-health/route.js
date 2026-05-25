import { NextResponse } from "next/server";
import { verifyEmailTransport } from "../../library/mailer";

export const runtime = "nodejs";

export async function GET() {
  const provider = "smtp";

  try {
    await verifyEmailTransport();

    return NextResponse.json({
      success: true,
      provider,
      mail: "ok",
      env: {
        EMAIL_USER: Boolean(process.env.EMAIL_USER),
        EMAIL_FROM: Boolean(process.env.EMAIL_FROM),
        EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
        COMPANY_EMAIL: Boolean(process.env.COMPANY_EMAIL),
      },
    });
  } catch (error) {
    console.error("[Mail Health] Email verification failed:", error);

    return NextResponse.json(
      {
        success: false,
        provider,
        mail: "failed",
        error: error?.code || error?.message || "Unknown email error",
        env: {
          EMAIL_USER: Boolean(process.env.EMAIL_USER),
          EMAIL_FROM: Boolean(process.env.EMAIL_FROM),
          EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
          COMPANY_EMAIL: Boolean(process.env.COMPANY_EMAIL),
        },
      },
      { status: 500 }
    );
  }
}
