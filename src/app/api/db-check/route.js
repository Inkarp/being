import { NextResponse } from "next/server";
import clientPromise from "../../library/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    // simple ping
    await db.command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}