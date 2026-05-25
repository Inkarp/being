const files = [
  "../api/index.js",
  "../api/mail-health.js",
  "../api/send-otp.js",
  "../api/verify-otp.js",
  "../api/form-email.js",
  "../lib/http.js",
  "../lib/mailer.js",
  "../lib/mongodb.js",
  "../lib/otp.js",
  "../lib/form-email.js",
];

for (const file of files) {
  await import(new URL(file, import.meta.url));
}

console.log("email service imports ok");
