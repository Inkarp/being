import { NextResponse } from "next/server";
import clientPromise from "../../library/mongodb";

export const runtime = "nodejs";

const DB_NAME = process.env.MONGODB_DB || "BeingDB";
const OTP_COLLECTION = "emailOtps";

function getMongoUriInfo() {
  const uri = process.env.MONGODB_URI || "";

  try {
    const parsed = new URL(uri);
    return {
      present: Boolean(uri),
      protocol: parsed.protocol,
      host: parsed.host,
      databaseInUri: parsed.pathname.replace(/^\//, "") || null,
      hasUsername: Boolean(parsed.username),
      hasPassword: Boolean(parsed.password),
      appName: parsed.searchParams.get("appName"),
    };
  } catch {
    return {
      present: Boolean(uri),
      invalidFormat: Boolean(uri),
    };
  }
}

function serializeMongoError(error) {
  return {
    name: error?.name,
    code: error?.code,
    codeName: error?.codeName,
    message: error?.message,
    reason: error?.reason?.message || String(error?.reason || ""),
    stack: error?.stack,
  };
}

export async function GET() {
  const startedAt = Date.now();

  try {
    console.log("[db-check] Starting MongoDB diagnostic", {
      dbName: DB_NAME,
      collection: OTP_COLLECTION,
      uri: getMongoUriInfo(),
    });

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    console.log("[db-check] Client connected, running ping");
    await db.command({ ping: 1 });

    const collection = db.collection(OTP_COLLECTION);

    console.log("[db-check] Counting OTP collection documents");
    const estimatedDocumentCount = await collection.estimatedDocumentCount();

    console.log("[db-check] Ensuring OTP indexes");
    const indexResults = await Promise.all([
      collection.createIndex({ email: 1, createdAt: -1 }),
      collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]);

    const indexes = await collection.indexes();

    console.log("[db-check] MongoDB diagnostic completed", {
      dbName: DB_NAME,
      collection: OTP_COLLECTION,
      estimatedDocumentCount,
      indexResults,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      dbName: DB_NAME,
      collection: OTP_COLLECTION,
      estimatedDocumentCount,
      indexResults,
      indexes: indexes.map((index) => ({
        name: index.name,
        key: index.key,
        expireAfterSeconds: index.expireAfterSeconds,
      })),
      uri: getMongoUriInfo(),
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    console.error("[db-check] MongoDB diagnostic failed", serializeMongoError(error));

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB diagnostic failed",
        dbName: DB_NAME,
        collection: OTP_COLLECTION,
        uri: getMongoUriInfo(),
        error: serializeMongoError(error),
        durationMs: Date.now() - startedAt,
      },
      { status: 500 }
    );
  }
}
