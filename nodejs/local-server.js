import http from "http";
import { parse } from "url";
import index from "./api/index.js";
import mailHealth from "./api/mail-health.js";
import sendOtp from "./api/send-otp.js";
import verifyOtp from "./api/verify-otp.js";
import formEmail from "./api/form-email.js";
import { loadLocalEnv } from "./lib/load-env.js";

loadLocalEnv();

const routes = {
  "/": index,
  "/api": index,
  "/api/mail-health": mailHealth,
  "/api/send-otp": sendOtp,
  "/api/verify-otp": verifyOtp,
  "/api/form-email": formEmail,
};

const server = http.createServer(async (req, res) => {
  const { pathname } = parse(req.url);
  const handler = routes[pathname];

  res.status = function status(code) {
    res.statusCode = code;
    return res;
  };

  res.json = function json(body) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
  };

  if (!handler) {
    res.status(404).json({ success: false, message: "Not found" });
    return;
  }

  await handler(req, res);
});

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`Being email service local server running at http://localhost:${port}`);
});
