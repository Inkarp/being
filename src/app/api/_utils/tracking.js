export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getClientIp(request) {
  if (typeof request === "string") return request;

  const forwarded = request?.headers?.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = request?.headers?.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = request?.headers?.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "Unknown";
}

export function normalizeTracking(formData = {}, requestOrIp) {
  const ip = formData.ipAddress || formData._ipAddress || getClientIp(requestOrIp);
  const pageUrl = formData._pageUrl || formData.fullUrl || formData.landingUrl || "";
  const referrer = formData._referrerUrl || formData.referrer || "Direct / None";
  const trafficSource =
    formData._trafficSource ||
    formData.utm_source ||
    formData.source ||
    "Direct / None";
  const searchKeyword = formData._searchKeyword || formData.utm_term || formData.keyword || "";

  return {
    ip,
    ipAddress: ip,
    deviceType: formData._deviceType || formData.deviceType || null,
    trafficSource,
    source: trafficSource,
    searchKeyword,
    keyword: searchKeyword,
    referrer,
    pageUrl,
    landingUrl: formData.landingUrl || pageUrl,
    pagePath: formData.pagePath || null,
    fullUrl: formData.fullUrl || pageUrl,
    utmSource: formData.utm_source || formData._trafficSource || null,
    utmMedium: formData._utmMedium || formData.utm_medium || null,
    utmCampaign: formData._utmCampaign || formData.utm_campaign || null,
    utmTerm: formData._utmTerm || formData.utm_term || null,
    utmContent: formData._utmContent || formData.utm_content || null,
    gclid: formData._gclid || formData.gclid || null,
    fbclid: formData._fbclid || formData.fbclid || null,
    userAgent: formData._userAgent || formData.userAgent || null,
    timestamp: formData.timestamp || formData.submittedAt || new Date().toISOString(),
  };
}

function valueColor(label, value) {
  const text = String(value || "");
  if (/ip address/i.test(label)) return "#f87171";
  if (/mobile/i.test(text)) return "#f59e0b";
  if (/tablet/i.test(text)) return "#a78bfa";
  if (/desktop/i.test(text)) return "#22d3ee";
  if (/google/i.test(text)) return "#4285F4";
  if (/bing/i.test(text)) return "#008373";
  if (/facebook|instagram/i.test(text)) return "#1877F2";
  if (/direct/i.test(text)) return "#94a3b8";
  if (/gclid|fbclid|keyword|campaign|utm/i.test(label) && text) return "#fbbf24";
  return "#e2e8f0";
}

function trackingRow(icon, label, value, options = {}) {
  const displayValue = value ? escapeHtml(value) : "N/A";
  const fontFamily = options.mono ? "font-family:Consolas,Monaco,monospace;" : "";

  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#000;font-size:13px;font-weight:700;white-space:nowrap;vertical-align:top;width:36%;">
        <span style="color:#666;margin-right:6px;">${icon}</span>${escapeHtml(label)}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#000;font-size:${options.small ? "11px" : "13px"};font-weight:${value ? "700" : "500"};word-break:break-word;${fontFamily}">
        ${displayValue}
      </td>
    </tr>
  `;
}

export function buildTrackingEmailRows(tracking) {
  const rows = [
    ["&#127760;", "IP Address", tracking.ip, { mono: true }],
    ["&#128187;", "Device", tracking.deviceType],
    ["&#128269;", "Traffic Source", tracking.trafficSource],
    ["&#128273;", "Search Keyword", tracking.searchKeyword],
    ["&#128227;", "UTM Campaign", tracking.utmCampaign],
    ["&#128246;", "UTM Medium", tracking.utmMedium],
    ["&#127919;", "UTM Term", tracking.utmTerm],
    ["&#128196;", "UTM Content", tracking.utmContent],
    ["&#128279;", "GCLID", tracking.gclid, { mono: true, small: true }],
    ["&#128279;", "FBCLID", tracking.fbclid, { mono: true, small: true }],
    ["&#128462;", "Page URL", tracking.pageUrl || tracking.fullUrl, { small: true }],
    ["&#128279;", "Referrer", tracking.referrer, { small: true }],
    ["&#128421;", "User Agent", tracking.userAgent, { mono: true, small: true }],
  ];

  return `
    <tr>
      <td colspan="2" style="padding:10px 12px;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;background:#f9fafb;">
        <span style="font-size:12px;font-weight:bold;color:#000;">
          &#128202; Tracking Information
        </span>
      </td>
    </tr>
    ${rows.map(([icon, label, value, options]) => trackingRow(icon, label, value, options)).join("")}
  `;
}

export function buildTrackingPlainText(tracking) {
  return [
    "TRACKING DETAILS",
    "IP Address    : " + (tracking.ip || "-"),
    "Device        : " + (tracking.deviceType || "-"),
    "Traffic Source: " + (tracking.trafficSource || "-"),
    "Search Keyword: " + (tracking.searchKeyword || "-"),
    "UTM Source    : " + (tracking.utmSource || "-"),
    "UTM Medium    : " + (tracking.utmMedium || "-"),
    "UTM Campaign  : " + (tracking.utmCampaign || "-"),
    "UTM Term      : " + (tracking.utmTerm || "-"),
    "UTM Content   : " + (tracking.utmContent || "-"),
    "GCLID         : " + (tracking.gclid || "-"),
    "FBCLID        : " + (tracking.fbclid || "-"),
    "Page URL      : " + (tracking.pageUrl || tracking.fullUrl || "-"),
    "Referrer      : " + (tracking.referrer || "-"),
    "User Agent    : " + (tracking.userAgent || "-"),
  ].join("\n");
}
