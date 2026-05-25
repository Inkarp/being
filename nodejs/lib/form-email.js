function sanitize(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim()
    .slice(0, 2000);
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px;color:#94a3b8;border-bottom:1px solid #1e293b;width:36%;font-weight:700;">${sanitize(label)}</td>
      <td style="padding:10px;color:#f8fafc;border-bottom:1px solid #1e293b;word-break:break-word;">${sanitize(value) || "N/A"}</td>
    </tr>
  `;
}

export function buildFormEmail({ formType = "Website Enquiry", data = {}, ip = "" }) {
  const entries = Object.entries(data)
    .filter(([key]) => !["website", "honeypot"].includes(key))
    .map(([key, value]) => row(key, value))
    .join("");

  const title = sanitize(formType);
  const product = data.product || data.productName || data.enquiredProduct || "";

  return {
    subject: `[${title}] ${product || data.name || data.email || "New Lead"}`,
    text: [
      `${title}`,
      ip ? `IP: ${ip}` : "",
      "",
      ...Object.entries(data).map(([key, value]) => `${key}: ${value ?? ""}`),
    ].filter(Boolean).join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;background:#0f172a;padding:28px;border-radius:14px;">
        <h2 style="margin:0 0 18px;color:#f97316;">${title}</h2>
        ${ip ? `<p style="color:#94a3b8;margin:0 0 12px;">IP: ${sanitize(ip)}</p>` : ""}
        <table style="width:100%;border-collapse:collapse;background:#020617;">${entries}</table>
        <p style="margin:20px 0 0;color:#64748b;font-size:12px;text-align:center;">
          Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
      </div>
    `,
  };
}
