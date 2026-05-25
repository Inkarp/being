import { MongoClient } from "mongodb";

let clientPromise;

export function getMongoClient() {
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "BeingDB");
}
