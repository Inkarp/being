import { NextResponse } from 'next/server';
import clientPromise from '../../library/mongodb';
import { sendEmail } from '../../library/mailer';
import { normalizeTracking } from '../_utils/tracking';

export const runtime = 'nodejs';

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION PATTERNS
// ─────────────────────────────────────────────────────────────────────────────

const GST_REGEX   = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const REQUIRED_EMAIL_ENV = ['COMPANY_EMAIL'];

// ─────────────────────────────────────────────────────────────────────────────
// NODEMAILER TRANSPORTER
// Created once outside the handler to reuse the SMTP connection pool.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITER
// Prevents the same IP from spamming the form.
// Map: { "1.2.3.4": { count: 3, resetAt: 1234567890 } }
// ─────────────────────────────────────────────────────────────────────────────

const rateLimitStore  = new Map();
const RATE_LIMIT_MAX    = 50;              // Increased for development; reduce to 5 for production
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Per hour (ms)

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// Clean up expired entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitStore.delete(ip);
  });
}, 30 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────
// SANITIZE
// Strips HTML / escapes special chars to prevent XSS / email injection
// ─────────────────────────────────────────────────────────────────────────────

function sanitize(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;')
    .trim()
    .slice(0, 1000);
}

// ─────────────────────────────────────────────────────────────────────────────
// IP EXTRACTION
// ─────────────────────────────────────────────────────────────────────────────

function getIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return 'Unknown';
}

function getMissingEmailEnv() {
  return REQUIRED_EMAIL_ENV.filter((key) => !process.env[key]);
}

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL HTML BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailHtml(formData, ip, submittedAt) {

  function row(label, value) {
    return (
      `<tr>` +
        `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-align:left;width:35%;">${label}</td>` +
        `<td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:left;">${sanitize(value) || '—'}</td>` +
      `</tr>`
    );
  }

  function sectionHead(title) {
    return (
      `<tr>` +
        `<td colspan="2" style="padding:10px 12px;font-weight:bold;text-align:left;background:#f9fafb;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">${title}</td>` +
      `</tr>`
    );
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Price Enquiry — ${sanitize(formData.product)}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:1px solid #e5e7eb;">

      <!-- HEADER -->
      <tr>
        <td style="padding:20px 15px;background:#2F4191;color:white;">
          <h2 style="margin:0 0 10px;font-size:18px;color:white;">Price Enquiry</h2>
          <p style="margin:0 0 5px;font-weight:bold;color:white;">Product: ${sanitize(formData.product)}</p>
          ${formData.price ? `<p style="margin:0 0 5px;color:white;">Price: ₹ ${sanitize(formData.price)}</p>` : ''}
          <p style="margin:0;font-size:12px;color:white;">Received: ${submittedAt}</p>
        </td>
      </tr>

      <!-- TABLE BODY -->
      <tr>
        <td style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

            ${sectionHead('Contact Information')}
            ${row('Full Name', formData.name)}
            ${row('Company', formData.company)}
            ${row('Designation', formData.designation)}
            ${row('Department', formData.department)}
            ${row('Industry', formData.industry)}
            ${row('Phone', '+91 ' + formData.phone)}
            ${row('Email', formData.email)}

            ${sectionHead('Location Details')}
            ${row('City', formData.city)}
            ${row('State', formData.state)}
            ${row('Country', 'India')}
            ${formData.gstNumber ? row('GST Number', formData.gstNumber) : ''}

            ${formData.message
              ? sectionHead('Message') +
                `<tr><td colspan="2" style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${sanitize(formData.message).replace(/\n/g, '<br>')}</td></tr>`
              : ''}

            ${sectionHead('Tracking Information')}
            ${row('IP Address', ip)}
            ${row('Device', formData._deviceType || 'Unknown')}
            ${row('Traffic Source', formData._trafficSource || 'Direct')}
            ${row('Search Keyword', formData._searchKeyword || '—')}
            ${formData._utmCampaign ? row('UTM Campaign', formData._utmCampaign) : ''}
            ${formData._utmMedium ? row('UTM Medium', formData._utmMedium) : ''}
            ${row('Page URL', formData._pageUrl || '—')}
            ${row('Referrer', formData._referrerUrl || 'Direct / None')}
            ${row('User Agent', formData._userAgent || '—')}

          </table>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="padding:15px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;">
          Auto-generated from Being India website. Do not reply to this email.
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAIN TEXT FALLBACK
// ─────────────────────────────────────────────────────────────────────────────

function buildPlainText(formData, ip, submittedAt) {
  const lines = [
    'Being India — New Price Enquiry',
    'Received: ' + submittedAt,
    '',
    '── PRODUCT ─────────────────────────',
    'Product       : ' + (formData.product || '—'),
    'Price         : ' + (formData.price ? '₹ ' + formData.price : '—'),
    '',
    '── CONTACT DETAILS ─────────────────',
    'Name          : ' + (formData.name        || '—'),
    'Company       : ' + (formData.company     || '—'),
    'Designation   : ' + (formData.designation || '—'),
    'Department    : ' + (formData.department  || '—'),
    'Industry      : ' + (formData.industry    || '—'),
    'Phone         : +91 ' + (formData.phone   || '—'),
    'Email         : ' + (formData.email       || '—'),
    '',
    '── BUSINESS INFO ───────────────────',
    'GST Number    : ' + (formData.gstNumber   || '—'),
    'City          : ' + (formData.city        || '—'),
    'State         : ' + (formData.state       || '—'),
    'Country       : India',
    '',
    ...(formData.message ? ['── MESSAGE ─────────────────────────', formData.message, ''] : []),
    '── VISITOR INTELLIGENCE ────────────',
    'IP Address    : ' + ip,
    'Device        : ' + (formData._deviceType    || '—'),
    'Traffic Source: ' + (formData._trafficSource || '—'),
    'Search Keyword: ' + (formData._searchKeyword || '—'),
    'UTM Medium    : ' + (formData._utmMedium     || '—'),
    'UTM Campaign  : ' + (formData._utmCampaign   || '—'),
    'Page URL      : ' + (formData._pageUrl       || '—'),
    'Referrer      : ' + (formData._referrerUrl   || '—'),
    '',
    'Auto-generated from the Being India website.',
  ];
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN POST HANDLER
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request) {

  // ── 1. Extract IP ──
  const ip = getIp(request);

  // ── 2. Rate limit ──
  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in an hour.' },
      { status: 429 }
    );
  }

  // ── 3. Parse body ──
  let formData;
  try {
    formData = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body. Expected JSON.' }, { status: 400 });
  }

  // ── 4. Shape check ──
  if (!formData || typeof formData !== 'object') {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }

  // ── 5. Honeypot ──
  if (formData.website || formData.honeypot) {
    return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
  }

  // ── 6. Server-side validation ──

  if (!formData.name?.trim())
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 });

  if (!formData.company?.trim())
    return NextResponse.json({ error: 'Company is required.' }, { status: 422 });

  // GST is optional — only validate format if provided
  if (formData.gstNumber && !GST_REGEX.test(formData.gstNumber))
    return NextResponse.json({ error: 'Invalid GST number format.' }, { status: 422 });

  if (!formData.industry?.trim())
    return NextResponse.json({ error: 'Industry is required.' }, { status: 422 });

  if (!formData.designation?.trim())
    return NextResponse.json({ error: 'Designation is required.' }, { status: 422 });

  if (!formData.department?.trim())
    return NextResponse.json({ error: 'Department is required.' }, { status: 422 });

  if (!PHONE_REGEX.test(formData.phone))
    return NextResponse.json({ error: 'Phone must be exactly 10 digits.' }, { status: 422 });

  // Single email field — personal or official, user chooses
  if (!EMAIL_REGEX.test(formData.email))
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 });

  if (!formData.state?.trim())
    return NextResponse.json({ error: 'State is required.' }, { status: 422 });

  if (!formData.city?.trim())
    return NextResponse.json({ error: 'City is required.' }, { status: 422 });

  // ── 7. Timestamp ──
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const tracking = normalizeTracking(formData, ip);

  // ── 8. Save to MongoDB ──
  let dbInsertedId = null;
  let dbSaved = false;

  try {
    const client = await clientPromise;
    const db     = client.db('BeingDB');

    const dbDoc = {
      // Lead metadata
      leadType:    'Price Enquiry',
      leadSource:  'Website',
      status:      'New',
      priority:    'Normal',
      assignedTo:   null,
      followUpDate: null,
      isContacted:  false,

      // Product
      product: formData.product || null,
      price:   formData.price   || null,

      // Customer details
      name:        formData.name,
      company:     formData.company,
      gstNumber:   formData.gstNumber   || null,
      industry:    formData.industry    || null,
      designation: formData.designation || null,
      department:  formData.department  || null,
      phone:       formData.phone,
      email:       formData.email,         // single email field
      state:       formData.state         || null,
      city:        formData.city          || null,
      message:     formData.message       || null,

      // Tracking
      tracking,

      // Timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const dbResult = await db.collection('productPriceEnquiries').insertOne(dbDoc);
    dbInsertedId   = dbResult.insertedId;
    dbSaved        = true;
    console.log('[PriceEnquiry] Saved to DB:', dbInsertedId);

  } catch (dbError) {
    // DB failure is logged but does NOT block the email.
    // You still receive the lead even if MongoDB is down.
    console.error('[PriceEnquiry] DB save failed:', dbError);
  }

  // ── 9. Send Email ──
  let emailSent = false;
  let emailErrorMessage = null;

  try {
    const missingEmailEnv = getMissingEmailEnv();
    if (missingEmailEnv.length > 0) {
      throw new Error(`Missing email environment variable(s): ${missingEmailEnv.join(', ')}`);
    }

    const emailHtml = buildEmailHtml(formData, ip, submittedAt);
    const emailText = buildPlainText(formData, ip, submittedAt);
    const subject   = `[Price Enquiry] ${formData.product || 'New Lead'} — ${ip}`;

    await sendEmail({
      from:    `"Being India Website" <${process.env.EMAIL_USER}>`,
      to:      process.env.COMPANY_EMAIL,
      replyTo: formData.email, // Reply in Gmail opens the customer's email directly
      subject,
      text:    emailText,
      html:    emailHtml,
    });

    emailSent = true;
    console.log('[PriceEnquiry] Email sent for:', formData.product);

  } catch (emailError) {
    emailErrorMessage = emailError?.message || 'Unknown email error';
    console.error('[PriceEnquiry] Email failed:', emailError);

    if (dbSaved) {
      return NextResponse.json(
        {
          success: true,
          insertedId: dbInsertedId ? dbInsertedId.toString() : null,
          emailSent: false,
          warning: 'Your enquiry was saved, but the notification email could not be sent.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to submit enquiry because the notification email could not be sent.',
        details: process.env.NODE_ENV === 'development' ? emailErrorMessage : undefined,
      },
      { status: 500 }
    );
  }

  // ── 10. Success ──
  return NextResponse.json(
    {
      success: true,
      insertedId: dbInsertedId ? dbInsertedId.toString() : null,
      emailSent,
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
