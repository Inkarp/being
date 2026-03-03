import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '../../library/mongodb';

export const runtime = 'nodejs';

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION PATTERNS
// ─────────────────────────────────────────────────────────────────────────────

const GST_REGEX   = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

// ─────────────────────────────────────────────────────────────────────────────
// NODEMAILER TRANSPORTER
// We create this once outside the handler so it reuses the connection
// instead of creating a new one on every request.
// ─────────────────────────────────────────────────────────────────────────────

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,   // Use Gmail App Password — NOT your real password
  },
  pool: true,           // Keep connection alive and reuse it
  maxConnections: 3,    // Max 3 parallel SMTP connections
});

// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITER
// Prevents the same IP from spamming the form.
// Map structure: { "1.2.3.4": { count: 3, resetAt: 1234567890 } }
// ─────────────────────────────────────────────────────────────────────────────

var rateLimitStore = new Map();
var RATE_LIMIT_MAX    = 5;                   // Max 5 submissions
var RATE_LIMIT_WINDOW = 60 * 60 * 1000;     // Per hour (in milliseconds)

function checkRateLimit(ip) {
  var now   = Date.now();
  var entry = rateLimitStore.get(ip);

  // First request from this IP, or window has expired — reset
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false; // NOT rate limited
  }

  // Already hit the limit
  if (entry.count >= RATE_LIMIT_MAX) {
    return true; // IS rate limited
  }

  // Increment the counter
  entry.count = entry.count + 1;
  return false; // NOT rate limited
}

// Clean up expired entries every 30 minutes so memory doesn't grow forever
setInterval(function () {
  var now = Date.now();
  rateLimitStore.forEach(function (entry, ip) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(ip);
    }
  });
}, 30 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────
// SANITIZE
// Strips HTML tags from any string value to prevent email injection / XSS
// ─────────────────────────────────────────────────────────────────────────────

function sanitize(value) {
  if (value === null || value === undefined) return '';
  var str = String(value);
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;')
    .trim()
    .slice(0, 1000); // Hard cap — prevents oversized payloads
}

// ─────────────────────────────────────────────────────────────────────────────
// IP EXTRACTION
// Works on Vercel, Cloudflare, and standard proxies
// ─────────────────────────────────────────────────────────────────────────────

function getIp(request) {
  // x-forwarded-for can contain multiple IPs — we want the first (real client)
  var forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Cloudflare sends this header
  var cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  return 'Unknown';
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL HTML BUILDER
// Builds a clean dark-themed email with two tables:
//   1. Product + Customer Details
//   2. Tracking / Analytics Info
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailHtml(formData, ip, submittedAt) {

  // Helper: renders one row in the table
  function row(label, value, highlight) {
    var bgColor    = highlight ? '#1e3a5f' : '#020617';
    var labelColor = '#94a3b8';
    var valueColor = highlight ? '#fbbf24' : '#e2e8f0';

    return (
      '<tr style="background:' + bgColor + ';">' +
        '<td style="' +
          'padding:11px 16px;' +
          'border-bottom:1px solid #1e293b;' +
          'font-size:13px;' +
          'font-weight:700;' +
          'color:' + labelColor + ';' +
          'white-space:nowrap;' +
          'width:36%;' +
          'vertical-align:top;' +
        '">' + label + '</td>' +
        '<td style="' +
          'padding:11px 16px;' +
          'border-bottom:1px solid #1e293b;' +
          'font-size:13px;' +
          'color:' + valueColor + ';' +
          'word-break:break-word;' +
          'font-weight:' + (highlight ? '700' : '400') + ';' +
        '">' + (sanitize(value) || '<span style="color:#334155;">—</span>') + '</td>' +
      '</tr>'
    );
  }

  // Helper: section heading row inside the table
  function sectionHead(title, emoji) {
    return (
      '<tr>' +
        '<td colspan="2" style="' +
          'padding:12px 16px 8px;' +
          'background:#0f172a;' +
          'border-bottom:1px solid #1e293b;' +
          'border-top:2px solid #1e293b;' +
        '">' +
          '<span style="' +
            'font-size:10px;' +
            'font-weight:800;' +
            'letter-spacing:2px;' +
            'text-transform:uppercase;' +
            'color:#475569;' +
          '">' + emoji + '  ' + title + '</span>' +
        '</td>' +
      '</tr>'
    );
  }

  // Pick accent colour based on traffic source
  var source      = formData._trafficSource || 'Direct';
  var accentColor = '#22d3ee'; // default cyan
  if (/google/i.test(source))              accentColor = '#4285F4';
  if (/bing/i.test(source))               accentColor = '#008373';
  if (/facebook|instagram/i.test(source)) accentColor = '#1877F2';
  if (/direct/i.test(source))             accentColor = '#64748b';

  // Device badge colour
  var device      = sanitize(formData._deviceType || 'Unknown');
  var deviceColor = '#22d3ee';
  if (/mobile/i.test(device))  deviceColor = '#f59e0b';
  if (/tablet/i.test(device))  deviceColor = '#a78bfa';

  var html = '<!DOCTYPE html>' +
  '<html lang="en">' +
  '<head>' +
    '<meta charset="UTF-8"/>' +
    '<meta name="viewport" content="width=device-width,initial-scale=1.0"/>' +
    '<title>Price Enquiry — ' + sanitize(formData.product) + '</title>' +
  '</head>' +
  '<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">' +

  '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 16px;">' +
    '<tr><td align="center">' +
      '<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">' +

        // ── HEADER ──
        '<tr>' +
          '<td style="' +
            'background:' + accentColor + '18;' +
            'border:1px solid ' + accentColor + '44;' +
            'border-radius:12px 12px 0 0;' +
            'padding:24px 28px;' +
          '">' +
            '<p style="margin:0 0 4px;font-size:10px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:' + accentColor + ';">' +
              'Being India — Price Enquiry' +
            '</p>' +
            '<h1 style="margin:0;font-size:22px;color:#f8fafc;font-weight:800;">' +
              sanitize(formData.product) +
            '</h1>' +
            (formData.price
              ? '<p style="margin:6px 0 0;font-size:14px;color:#4ade80;font-weight:700;">₹ ' + sanitize(formData.price) + '</p>'
              : '') +
            '<p style="margin:10px 0 0;font-size:11px;color:#475569;">Received: ' + submittedAt + '</p>' +
          '</td>' +
        '</tr>' +

        // ── TABLE BODY ──
        '<tr>' +
          '<td style="background:#020617;border-left:1px solid ' + accentColor + '33;border-right:1px solid ' + accentColor + '33;padding:0;">' +
            '<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">' +

              // ── SECTION 1: CONTACT DETAILS ──
              sectionHead('Contact Details', '👤') +
              row('Full Name',       formData.name,         true) +
              row('Company',         formData.company,      false) +
              row('Designation',     formData.designation,  false) +
              row('Department',      formData.department,   false) +
              row('Industry',        formData.industry,     false) +
              row('Phone',           '+91 ' + formData.phone, false) +
              row('Personal Email',  formData.email,        false) +
              row('Official Email',  formData.officialEmail, false) +

              // ── SECTION 2: BUSINESS INFO ──
              sectionHead('Business Info', '🏢') +
              row('GST Number',      formData.gstNumber,    false) +
              row('City',            formData.city,         false) +
              row('State',           formData.state,        false) +
              row('Country',         'India',               false) +

              // ── SECTION 3: MESSAGE ──
              (formData.message
                ? sectionHead('Requirements / Message', '💬') +
                  '<tr><td colspan="2" style="padding:14px 16px;background:#020617;border-bottom:1px solid #1e293b;font-size:13px;color:#cbd5e1;line-height:1.7;">' +
                    sanitize(formData.message) +
                  '</td></tr>'
                : '') +

              // ── SECTION 4: VISITOR INTELLIGENCE ──
              sectionHead('Visitor Intelligence', '📊') +

              // IP address — red monospace for quick spotting
              '<tr style="background:#020617;">' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;width:36%;vertical-align:top;">🌐 IP Address</td>' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;color:#f87171;font-weight:700;font-family:monospace;">' + sanitize(ip) + '</td>' +
              '</tr>' +

              // Device — coloured pill
              '<tr style="background:#020617;">' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;">💻 Device</td>' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;">' +
                  '<span style="display:inline-block;background:' + deviceColor + '22;color:' + deviceColor + ';border:1px solid ' + deviceColor + '55;border-radius:20px;padding:2px 12px;font-size:11px;font-weight:800;letter-spacing:.5px;">' +
                    device +
                  '</span>' +
                '</td>' +
              '</tr>' +

              // Traffic Source — coloured pill
              '<tr style="background:#020617;">' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;">🔍 Traffic Source</td>' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;">' +
                  '<span style="display:inline-block;background:' + accentColor + '22;color:' + accentColor + ';border:1px solid ' + accentColor + '55;border-radius:20px;padding:2px 12px;font-size:11px;font-weight:800;letter-spacing:.5px;">' +
                    sanitize(source) +
                  '</span>' +
                '</td>' +
              '</tr>' +

              // Search keyword — amber if real, grey if not provided
              (function () {
                var kw      = formData._searchKeyword || '';
                var hasReal = kw && !/not provided/i.test(kw);
                var kwColor = hasReal ? '#fbbf24' : '#475569';
                var kwWeight = hasReal ? '700' : '400';
                return (
                  '<tr style="background:#020617;">' +
                    '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;">🔑 Search Keyword</td>' +
                    '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;color:' + kwColor + ';font-weight:' + kwWeight + ';">' +
                      (kw ? sanitize(kw) : '<span style="color:#334155;font-style:italic;">Not available</span>') +
                    '</td>' +
                  '</tr>'
                );
              })() +

              // UTM Campaign
              (formData._utmCampaign
                ? row('📢 Campaign',    formData._utmCampaign,  false)
                : '') +
              (formData._utmMedium
                ? row('📡 Medium',      formData._utmMedium,    false)
                : '') +

              // Page URL — clickable link
              '<tr style="background:#020617;">' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;">📄 Page URL</td>' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:12px;word-break:break-all;">' +
                  (formData._pageUrl
                    ? '<a href="' + sanitize(formData._pageUrl) + '" style="color:#38bdf8;text-decoration:none;">' + sanitize(formData._pageUrl) + '</a>'
                    : '<span style="color:#334155;">—</span>') +
                '</td>' +
              '</tr>' +

              // Referrer
              '<tr style="background:#020617;">' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:13px;font-weight:700;color:#94a3b8;white-space:nowrap;vertical-align:top;">🔗 Referrer</td>' +
                '<td style="padding:11px 16px;border-bottom:1px solid #1e293b;font-size:12px;word-break:break-all;color:#64748b;">' +
                  (formData._referrerUrl && formData._referrerUrl !== 'Direct / None'
                    ? '<a href="' + sanitize(formData._referrerUrl) + '" style="color:#64748b;text-decoration:none;">' + sanitize(formData._referrerUrl) + '</a>'
                    : '<span style="color:#334155;font-style:italic;">Direct / None</span>') +
                '</td>' +
              '</tr>' +

              // User Agent — small monospace
              '<tr style="background:#020617;">' +
                '<td style="padding:9px 16px;font-size:11px;font-weight:600;color:#334155;white-space:nowrap;vertical-align:top;">🖥️ User Agent</td>' +
                '<td style="padding:9px 16px;font-size:10px;color:#334155;word-break:break-all;font-family:monospace;">' +
                  sanitize(formData._userAgent || '') +
                '</td>' +
              '</tr>' +

            '</table>' +
          '</td>' +
        '</tr>' +

        // ── FOOTER ──
        '<tr>' +
          '<td style="background:#0f172a;border:1px solid ' + accentColor + '22;border-top:none;border-radius:0 0 12px 12px;padding:16px 28px;text-align:center;">' +
            '<p style="margin:0;font-size:11px;color:#334155;">' +
              'Auto-generated from the Being India website. Do not reply to this email.' +
            '</p>' +
          '</td>' +
        '</tr>' +

      '</table>' +
    '</td></tr>' +
  '</table>' +

  '</body></html>';

  return html;
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAIN TEXT FALLBACK
// Important for email deliverability — spam filters penalise HTML-only emails
// ─────────────────────────────────────────────────────────────────────────────

function buildPlainText(formData, ip, submittedAt) {
  var lines = [
    'Being India — New Price Enquiry',
    'Received: ' + submittedAt,
    '',
    '── PRODUCT ─────────────────────────',
    'Product       : ' + (formData.product  || '—'),
    'Price         : ' + (formData.price    ? '₹ ' + formData.price : '—'),
    '',
    '── CONTACT DETAILS ─────────────────',
    'Name          : ' + (formData.name          || '—'),
    'Company       : ' + (formData.company        || '—'),
    'Designation   : ' + (formData.designation    || '—'),
    'Department    : ' + (formData.department     || '—'),
    'Industry      : ' + (formData.industry       || '—'),
    'Phone         : +91 ' + (formData.phone      || '—'),
    'Personal Email: ' + (formData.email          || '—'),
    'Official Email: ' + (formData.officialEmail  || '—'),
    '',
    '── BUSINESS INFO ───────────────────',
    'GST Number    : ' + (formData.gstNumber      || '—'),
    'City          : ' + (formData.city           || '—'),
    'State         : ' + (formData.state          || '—'),
    'Country       : India',
    '',
  ];

  if (formData.message) {
    lines.push('── MESSAGE ─────────────────────────');
    lines.push(formData.message);
    lines.push('');
  }

  lines = lines.concat([
    '── VISITOR INTELLIGENCE ────────────',
    'IP Address    : ' + ip,
    'Device        : ' + (formData._deviceType     || '—'),
    'Traffic Source: ' + (formData._trafficSource  || '—'),
    'Search Keyword: ' + (formData._searchKeyword  || '—'),
    'UTM Medium    : ' + (formData._utmMedium      || '—'),
    'UTM Campaign  : ' + (formData._utmCampaign    || '—'),
    'Page URL      : ' + (formData._pageUrl        || '—'),
    'Referrer      : ' + (formData._referrerUrl    || '—'),
    '',
    'Auto-generated from the Being India website.',
  ]);

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN POST HANDLER
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request) {

  // ── 1. Extract IP (needed for rate limiting + email) ──
  var ip = getIp(request);

  // ── 2. Rate limit check ──
  // if (checkRateLimit(ip)) {
  //   return NextResponse.json(
  //     { error: 'Too many requests. Please try again in an hour.' },
  //     { status: 429 }
  //   );
  // }

  // ── 3. Parse request body ──
  var formData;
  try {
    formData = await request.json();
  } catch (parseError) {
    return NextResponse.json(
      { error: 'Invalid request body. Expected JSON.' },
      { status: 400 }
    );
  }

  // ── 4. Basic shape check ──
  if (!formData || typeof formData !== 'object') {
    return NextResponse.json(
      { error: 'Invalid payload.' },
      { status: 400 }
    );
  }

  // ── 5. Honeypot check (spam bots fill hidden fields) ──
  if (formData.website || formData.honeypot) {
    return NextResponse.json(
      { error: 'Spam detected.' },
      { status: 400 }
    );
  }

  // ── 6. Server-side validation ──
  // We always validate on the server even though the frontend validates too.
  // Never trust the client.

  if (!formData.name || !formData.name.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 });
  }

  if (!formData.company || !formData.company.trim()) {
    return NextResponse.json({ error: 'Company is required.' }, { status: 422 });
  }

  if (!GST_REGEX.test(formData.gstNumber)) {
    return NextResponse.json({ error: 'Invalid GST number.' }, { status: 422 });
  }

  if (!PHONE_REGEX.test(formData.phone)) {
    return NextResponse.json({ error: 'Phone must be exactly 10 digits.' }, { status: 422 });
  }

  if (!EMAIL_REGEX.test(formData.email)) {
    return NextResponse.json({ error: 'Invalid personal email.' }, { status: 422 });
  }

  if (!EMAIL_REGEX.test(formData.officialEmail)) {
    return NextResponse.json({ error: 'Invalid official email.' }, { status: 422 });
  }

  if (formData.email === formData.officialEmail) {
    return NextResponse.json({ error: 'Personal and official email must be different.' }, { status: 422 });
  }

  // ── 7. Timestamp ──
  var submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // ── 8. Save to MongoDB ──
  // We wrap this in its own try/catch so that if the DB fails,
  // we still attempt to send the email and return a meaningful error.
  var dbInsertedId = null;

  try {
    var client = await clientPromise;
    var db     = client.db('BeingDB');

    var dbDoc = {
      // ── Lead metadata ──
      leadType:   'Price Enquiry',
      leadSource: 'Website',
      status:     'New',
      priority:   'Normal',
      assignedTo:   null,
      followUpDate: null,
      isContacted:  false,

      // ── Product ──
      product: formData.product || null,
      price:   formData.price   || null,

      // ── Customer details ──
      name:          formData.name,
      company:       formData.company,
      gstNumber:     formData.gstNumber,
      industry:      formData.industry      || null,
      designation:   formData.designation   || null,
      department:    formData.department    || null,
      phone:         formData.phone,
      email:         formData.email,
      officialEmail: formData.officialEmail,
      state:         formData.state         || null,
      city:          formData.city          || null,
      message:       formData.message       || null,

      // ── Tracking ──
      tracking: {
        ip:           ip,
        deviceType:   formData._deviceType    || null,
        referrer:     formData._referrerUrl   || null,
        pageUrl:      formData._pageUrl       || null,
        trafficSource:formData._trafficSource || null,
        searchKeyword:formData._searchKeyword || null,
        utmSource:    formData._trafficSource || null,
        utmMedium:    formData._utmMedium     || null,
        utmCampaign:  formData._utmCampaign   || null,
        userAgent:    formData._userAgent     || null,
      },

      // ── Timestamps ──
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    var dbResult = await db.collection('productPriceEnquiries').insertOne(dbDoc);
    dbInsertedId = dbResult.insertedId;
    console.log('[PriceEnquiry] Saved to DB:', dbInsertedId);

  } catch (dbError) {
    // DB failure is logged but does NOT block the email from sending.
    // You still get the lead in your inbox even if MongoDB is down.
    console.error('[PriceEnquiry] DB save failed:', dbError);
  }

  // ── 9. Send Email ──
  try {
    var emailHtml  = buildEmailHtml(formData, ip, submittedAt);
    var emailText  = buildPlainText(formData, ip, submittedAt);
    var subject    = '[Price Enquiry] ' + (formData.product || 'New Lead') + ' — ' + ip;

    await transporter.sendMail({
      from:    '"Being India Website" <' + process.env.EMAIL_USER + '>',
      to:      process.env.COMPANY_EMAIL,
      replyTo: formData.email,           // Clicking Reply in Gmail opens the customer's email
      subject: subject,
      text:    emailText,                // Plain-text fallback (important for spam score)
      html:    emailHtml,                // Rich HTML table version
    });

    console.log('[PriceEnquiry] Email sent for:', formData.product);

  } catch (emailError) {
    // If email fails, we still return 500 because the customer
    // expects confirmation that their enquiry was received.
    console.error('[PriceEnquiry] Email failed:', emailError);

    return NextResponse.json(
      { error: 'Failed to send confirmation email. Please try again.' },
      { status: 500 }
    );
  }

  // ── 10. Success ──
  return NextResponse.json(
    {
      success:     true,
      insertedId:  dbInsertedId ? dbInsertedId.toString() : null,
    },
    { status: 200 }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK ALL OTHER HTTP METHODS
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}