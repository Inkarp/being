export function setCors(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  const origin = req.headers.origin || "";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin === "*" ? "*" : origin === allowedOrigin ? origin : allowedOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export function handleOptions(req, res) {
  if (req.method === "OPTIONS") {
    setCors(req, res);
    res.status(204).end();
    return true;
  }
  return false;
}

export function json(res, status, body) {
  res.status(status).json(body);
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function withApi(handler) {
  return async function wrapped(req, res) {
    setCors(req, res);
    if (handleOptions(req, res)) return;

    try {
      await handler(req, res);
    } catch (error) {
      console.error("[Email Service]", error);
      json(res, 500, {
        success: false,
        message: error?.message || "Server error",
      });
    }
  };
}
