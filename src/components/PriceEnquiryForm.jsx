'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';

// ─── Regex & Constants ────────────────────────────────────────────────────────

const GST_REGEX = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir', 'Ladakh',
  'Andaman & Nicobar Islands', 'Lakshadweep', 'Dadra & Nagar Haveli', 'Daman & Diu',
];

const INITIAL_FORM = {
  name: '', company: '', gstNumber: '', industry: '',
  designation: '', department: '', phone: '', email: '',
  country: 'India', state: '', city: '', message: '',
};

// ─── Tracking ─────────────────────────────────────────────────────────────────

function detectDevice(ua = '') {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function parseReferrer(ref = '') {
  if (!ref) return { source: 'Direct / None', keyword: '' };
  try {
    const url = new URL(ref);
    const host = url.hostname.toLowerCase();
    const engines = [
      { p: /google\./, n: 'Google', q: 'q' },
      { p: /bing\./, n: 'Bing', q: 'q' },
      { p: /yahoo\./, n: 'Yahoo', q: 'p' },
      { p: /duckduckgo\./, n: 'DuckDuckGo', q: 'q' },
      { p: /yandex\./, n: 'Yandex', q: 'text' },
    ];
    for (const e of engines) {
      if (e.p.test(host)) return { source: e.n, keyword: url.searchParams.get(e.q) || '(not provided)' };
    }
    const social = [
      [/facebook\.|fb\.com/, 'Facebook'], [/instagram\./, 'Instagram'],
      [/linkedin\./, 'LinkedIn'], [/twitter\.|x\.com/, 'Twitter / X'],
      [/youtube\./, 'YouTube'], [/whatsapp\./, 'WhatsApp'],
    ];
    for (const [p, n] of social) if (p.test(host)) return { source: n, keyword: '' };
    return { source: `Referral: ${url.hostname}`, keyword: '' };
  } catch { return { source: 'Unknown', keyword: '' }; }
}

function collectTracking() {
  if (typeof window === 'undefined') return {};
  const ua = navigator.userAgent || '';
  const ref = document.referrer || '';
  const p = new URLSearchParams(window.location.search);
  const { source, keyword } = parseReferrer(ref);
  return {
    _pageUrl: window.location.href,
    _referrerUrl: ref || 'Direct / None',
    _trafficSource: p.get('utm_source') || source,
    _searchKeyword: p.get('utm_term') || p.get('utm_keyword') || keyword,
    _utmMedium: p.get('utm_medium') || '',
    _utmCampaign: p.get('utm_campaign') || '',
    _deviceType: detectDevice(ua),
    _userAgent: ua,
  };
}

// ─── Sanitizers ───────────────────────────────────────────────────────────────

const SANITIZERS = {
  name: (v) => v.replace(/[^a-zA-Z\s]/g, '').replace(/\b\w/g, c => c.toUpperCase()),
  company: (v) => v.replace(/[^a-zA-Z0-9\s&.,()-]/g, ''),
  gstNumber: (v) => v.toUpperCase().slice(0, 15),
  phone: (v) => v.replace(/\D/g, '').slice(0, 10),
  email: (v) => v.replace(/\s/g, ''),
  city: (v) => v.replace(/[^a-zA-Z\s]/g, ''),
  industry: (v) => v.replace(/[^a-zA-Z\s&/]/g, ''),
  designation: (v) => v.replace(/[^a-zA-Z\s.]/g, ''),
  department: (v) => v.replace(/[^a-zA-Z\s&/]/g, ''),
};

function sanitizeField(name, value) {
  if (/https?:\/\/|www\./i.test(value)) return null;
  return SANITIZERS[name] ? SANITIZERS[name](value) : value;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateAll(f) {
  const errs = {};
  if (!f.name.trim()) errs.name = 'Full name is required';
  if (!f.company.trim()) errs.company = 'Company name is required';
  if (f.gstNumber && !GST_REGEX.test(f.gstNumber)) errs.gstNumber = 'Enter a valid 15-digit GSTIN';
  if (!f.industry.trim()) errs.industry = 'Industry is required';
  if (!f.designation.trim()) errs.designation = 'Designation is required';
  if (!f.department.trim()) errs.department = 'Department is required';
  if (!PHONE_REGEX.test(f.phone)) errs.phone = 'Enter a valid 10-digit number';
  if (!EMAIL_REGEX.test(f.email)) errs.email = 'Enter a valid email address';
  if (!f.state) errs.state = 'Please select your state';
  if (!f.city.trim()) errs.city = 'City is required';
  return errs;
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconBuilding = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconMsg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconSpinner = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
    <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// ─── Small sub-components ─────────────────────────────────────────────────────

function SectionHeader({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 2px' }}>
      <span style={{
        width: 30, height: 30, borderRadius: 8,
        background: '#EFF6FF', color: '#1E3A8A',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A' }}>
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: '#DBEAFE', borderRadius: 1 }} />
    </div>
  );
}

function FieldLabel({ children, htmlFor, optional }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569', marginBottom: 6 }}>
      {children}
      {optional && <span style={{ fontSize: 10, fontWeight: 400, color: '#94A3B8', marginLeft: 5, textTransform: 'none', letterSpacing: 0 }}>— optional</span>}
    </label>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, color: '#DC2626', fontSize: 12, fontWeight: 500 }}>
      <IconAlert />{msg}
    </div>
  );
}

// Base input style factory
function inputStyle(hasError, readonly = false) {
  return {
    width: '100%', boxSizing: 'border-box',
    border: `1.5px solid ${hasError ? '#F87171' : readonly ? '#E2E8F0' : '#CBD5E1'}`,
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 14, fontFamily: 'inherit',
    color: readonly ? '#64748B' : '#0F172A',
    background: hasError ? '#FEF2F2' : readonly ? '#F8FAFC' : '#FFFFFF',
    outline: 'none',
    cursor: readonly ? 'not-allowed' : 'auto',
    borderStyle: readonly ? 'dashed' : 'solid',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  };
}

// ─── Field components ─────────────────────────────────────────────────────────

function TextInput({ label, id, name, value, onChange, placeholder, required, errors, optional }) {
  const err = errors?.[name];
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor={id || name} optional={optional}>{label}{required && <span style={{ color: '#EF4444', marginLeft: 3 }}>*</span>}</FieldLabel>
      <input
        id={id || name} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...inputStyle(!!err),
          borderColor: err ? '#F87171' : focused ? '#2563EB' : '#CBD5E1',
          boxShadow: focused && !err ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        }}
      />
      <FieldError msg={err} />
    </div>
  );
}

function GSTInput({ value, onChange, errors }) {
  const err = errors?.gstNumber;
  const hasValue = value.length > 0;
  const isValid = hasValue && GST_REGEX.test(value);
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor="gstNumber" optional>GST Number</FieldLabel>
      <div style={{ position: 'relative' }}>
        <input
          id="gstNumber" name="gstNumber" value={value} onChange={onChange}
          placeholder="22AAAAA0000A1Z5" maxLength={15}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...inputStyle(!!err || (hasValue && !isValid)),
            fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase',
            paddingRight: 40,
            borderColor: (err || (hasValue && !isValid)) ? '#F87171' : focused ? '#2563EB' : '#CBD5E1',
            boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
          }}
        />
        {hasValue && (
          <span style={{
            position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
            fontSize: 15, fontWeight: 700, color: isValid ? '#059669' : '#DC2626',
          }}>
            {isValid ? '✓' : '✗'}
          </span>
        )}
      </div>
      <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 5 }}>Format: 22AAAAA0000A1Z5 · 15 characters</p>
      <FieldError msg={err} />
    </div>
  );
}

function PhoneInput({ value, onChange, errors }) {
  const err = errors?.phone;
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor="phone">Phone Number<span style={{ color: '#EF4444', marginLeft: 3 }}>*</span></FieldLabel>
      <div style={{
        display: 'flex', borderRadius: 10, overflow: 'hidden',
        border: `1.5px solid ${err ? '#F87171' : focused ? '#2563EB' : '#CBD5E1'}`,
        boxShadow: focused && !err ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        background: err ? '#FEF2F2' : '#fff',
      }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px',
          background: '#F8FAFC', borderRight: '1.5px solid #E2E8F0',
          fontSize: 13, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap', userSelect: 'none',
        }}>
          🇮🇳 +91
        </span>
        <input
          id="phone" name="phone" value={value} onChange={onChange}
          placeholder="10-digit number" maxLength={10} inputMode="numeric" required
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', padding: '10px 14px',
            fontSize: 14, fontFamily: 'inherit', color: '#0F172A',
            background: 'transparent',
          }}
        />
      </div>
      <FieldError msg={err} />
    </div>
  );
}

function EmailInput({ value, onChange, errors }) {
  const [emailType, setEmailType] = useState('personal');
  const err = errors?.email;
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor="email">Email Address<span style={{ color: '#EF4444', marginLeft: 3 }}>*</span></FieldLabel>

      {/* Toggle */}
      {/* <div style={{
        display: 'inline-flex', background: '#F1F5F9', borderRadius: 8,
        padding: 3, gap: 3, marginBottom: 8,
        border: '1px solid #E2E8F0',
      }}>
        {[['personal', 'Personal'], ['official', 'Official']].map(([t, label]) => (
          <button
            key={t} type="button" onClick={() => setEmailType(t)}
            style={{
              padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: emailType === t ? '#1E3A8A' : 'transparent',
              color: emailType === t ? '#fff' : '#64748B',
            }}
          >
            {label}
          </button>
        ))}
      </div> */}

      <input
        id="email" name="email" type="email" value={value} onChange={onChange} required
        placeholder={emailType === 'personal' ? 'yourname@gmail.com' : 'name@company.com'}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...inputStyle(!!err),
          borderColor: err ? '#F87171' : focused ? '#2563EB' : '#CBD5E1',
          boxShadow: focused && !err ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        }}
      />
      {/* <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 5 }}>
        {'Personal email (Gmail, Outlook, etc.) Official / work email address'}
      </p> */}
      <FieldError msg={err} />
    </div>
  );
}

function StateSelect({ value, onChange, errors }) {
  const err = errors?.state;
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor="state">State<span style={{ color: '#EF4444', marginLeft: 3 }}>*</span></FieldLabel>
      <div style={{ position: 'relative' }}>
        <select
          id="state" name="state" value={value} onChange={onChange} required
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            ...inputStyle(!!err),
            paddingRight: 36, appearance: 'none', cursor: 'pointer',
            color: value ? '#0F172A' : '#94A3B8',
            borderColor: err ? '#F87171' : focused ? '#2563EB' : '#CBD5E1',
            boxShadow: focused && !err ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
          }}
        >
          <option value="" disabled>Select state</option>
          {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94A3B8' }}>
          <IconChevron />
        </span>
      </div>
      <FieldError msg={err} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PriceEnquiryForm({ isOpen, onClose, productData, onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  /* Animate in/out */
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Sync product */
  useEffect(() => {
    if (isOpen && productData) {
      setFormData(prev => ({ ...prev, product: productData.model || '', price: productData.price || '' }));
      setErrors({});
      setApiError('');
    }
  }, [isOpen, productData]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setFormData(INITIAL_FORM);
      setErrors({});
      setApiError('');
      onClose();
    }, 280);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeField(name, value);
    if (sanitized === null) return;
    setFormData(prev => ({ ...prev, [name]: sanitized }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateAll(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => {
        document.querySelector('[data-form-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    // ✅ ADD TRACKING HERE
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({
    //   event: "price_enquiry_submit",
    //   product_name: productData?.model || '',
    //   product_slug: productData?.meta?.slug || '',
    //   price: productData?.price || '',
    //   page_url: window.location.href
    // });
    setLoading(true);
    setApiError('');
    const payload = {
      ...formData,
      product: productData?.model || '',
      price: productData?.price || '',
      submittedAt: new Date().toISOString(),
      ...collectTracking(),
    };
    try {
      const res = await fetch('/api/priceEnquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Server error ${res.status}`);
      }


      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: `price_enquiry_success`,
        form_name: "price enquiry",
        product_id: productData?.productId || '',
        product_name: productData?.model || '',
        page_url: window.location.href
      });

      console.log(dataLayer)

      onSuccess?.({ product: productData, price: productData?.price });
      handleClose();
    } catch (err) {
      console.error('[PriceEnquiry]', err);
      setApiError(err.message || 'Submission failed. Please try again.');
      // ❗ Optional: failure tracking
      window.dataLayer.push({
        event: "price_enquiry_failed",
        product_slug: productData?.meta?.slug || ''
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <style>{css}</style>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`peq-overlay ${visible ? 'peq-overlay--in' : ''}`}
        onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        role="dialog" aria-modal="true" aria-label="Price Enquiry Form"
      >
        {/* Modal */}
        <div className={`peq-card ${visible ? 'peq-card--in' : ''}`}>
          {/* Accent bar */}
          <div className="peq-accent-bar" />

          {/* ── HEADER ── */}
          <div className="peq-header">
            <div className="peq-header-left">
              <span className="peq-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </span>
              <div>
                <p className="peq-eyebrow">Price Enquiry</p>
                <h2 className="peq-title">Unlock Your Exclusive Quote</h2>
              </div>
            </div>
            <button onClick={handleClose} className="peq-close" aria-label="Close">
              <IconClose />
            </button>
          </div>

          {/* ── PRODUCT CARD ── */}
          {productData && (
            <div className="peq-product">
              <div className="peq-product-inner">
                {productData.thumbnail && (
                  <div className="peq-product-img">
                    <Image src={productData.thumbnail} alt={productData.model} width={52} height={52} style={{ objectFit: 'contain' }} />
                  </div>
                )}
                <div className="peq-product-info">
                  <p className="peq-product-eyebrow">Selected Product</p>
                  <p className="peq-product-name">{productData.model}</p>
                </div>
                <span className="peq-product-badge">
                  <IconLock /> Exclusive
                </span>
              </div>
            </div>
          )}

          <div className="peq-divider" />

          {/* ── FORM BODY ── */}
          <div className="peq-scroll">
            <form onSubmit={handleSubmit} id={`price-enquiry-${productData?.productId}`} noValidate className="peq-form">
              {/* Personal Info */}
              {/* <SectionHeader icon={<IconUser />} label="Personal Information" /> */}
              <div className="peq-grid-2">
                <TextInput label="Full Name" name="name" value={formData.name}
                  onChange={handleChange} errors={errors} placeholder="e.g. Ravi Kumar" required />
                <TextInput label="Designation" name="designation" value={formData.designation}
                  onChange={handleChange} errors={errors} placeholder="e.g. Manager, Director" required />
                <EmailInput value={formData.email} onChange={handleChange} errors={errors} />
                <PhoneInput value={formData.phone} onChange={handleChange} errors={errors} />
              </div>

              {/* Organisation */}
              {/* <SectionHeader icon={<IconBuilding />} label="Organisation Details" /> */}
              <div className="peq-grid-2">
                <TextInput label="Company Name" name="company" value={formData.company}
                  onChange={handleChange} errors={errors} placeholder="Your company name" required />
                <GSTInput value={formData.gstNumber} onChange={handleChange} errors={errors} />
                <TextInput label="Industry" name="industry" value={formData.industry}
                  onChange={handleChange} errors={errors} placeholder="e.g. Pharma, Research" required />
                <TextInput label="Department" name="department" value={formData.department}
                  onChange={handleChange} errors={errors} placeholder="e.g. Procurement, R&D" required />
              </div>

              {/* Location */}
              {/* <SectionHeader icon={<IconPin />} label="Location" /> */}
              <div className="peq-grid-3">
                <TextInput label="City" name="city" value={formData.city}
                  onChange={handleChange} errors={errors} placeholder="e.g. Hyderabad" required />
                <StateSelect value={formData.state} onChange={handleChange} errors={errors} />
                <div>
                  <FieldLabel htmlFor="country">Country</FieldLabel>
                  <input
                    id="country" value="India" readOnly
                    style={inputStyle(false, true)}
                  />
                </div>
              </div>

              {/* Requirements */}
              {/* <SectionHeader icon={<IconMsg />} label="Requirements" /> */}
              <div>
                <FieldLabel htmlFor="message">Message / Requirements</FieldLabel>
                <TextareaField name="message" value={formData.message} onChange={handleChange}
                  placeholder="Describe your requirements — quantity, delivery timeline, application, special configurations…" />
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 5 }}>More detail → more accurate quote</p>
              </div>

              {/* Validation summary */}
              {errorCount > 0 && (
                <div data-form-error className="peq-warn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <strong>Please fix {errorCount} field{errorCount > 1 ? 's' : ''} before submitting</strong>
                    <p>Fields with errors are highlighted above.</p>
                  </div>
                </div>
              )}

              {/* API Error */}
              {apiError && (
                <div data-form-error className="peq-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <strong>Submission Failed</strong>
                    <p>{apiError}</p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button type="submit" id={`price-enquiry-btn-${productData?.productId}`} disabled={loading} className="peq-submit">
                {loading ? (
                  <><span className="peq-spinner" /> Sending Enquiry…</>
                ) : (
                  <><IconSend /> Unlock My Exclusive Price</>
                )}
              </button>

              {/* Trust note */}
              <p className="peq-trust">
                <IconLock />
                Your information is confidential and will never be shared with third parties.
              </p>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Textarea as a separate function (needs focus state)
function TextareaField({ name, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={name} name={name} rows={4} value={value} onChange={onChange}
      placeholder={placeholder}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focused ? '#2563EB' : '#CBD5E1'}`,
        borderRadius: 10, padding: '10px 14px',
        fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6,
        color: '#0F172A', background: '#fff',
        outline: 'none', resize: 'vertical', minHeight: 96,
        boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
      }}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  .peq-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(15,23,42,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 16px;
    opacity: 0; transition: opacity 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .peq-overlay--in { opacity: 1; }

  .peq-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 24px 64px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.06);
    max-width: 640px; width: 100%; max-height: 92vh;
    display: flex; flex-direction: column; position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    transform: translateY(20px) scale(0.98); opacity: 0;
    transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease;
  }
  .peq-card--in { transform: translateY(0) scale(1); opacity: 1; }

  .peq-accent-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #1E3A8A, #3B82F6); border-radius: 16px 16px 0 0;
  }

  /* Header */
  .peq-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 28px 28px 18px; gap: 12px; flex-shrink: 0;
  }
  .peq-header-left { display: flex; align-items: center; gap: 14px; }
  .peq-icon-badge {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(37,99,235,0.15);
  }
  .peq-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: #2563EB; margin: 0 0 3px;
  }
  .peq-title {
    font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 400;
    color: #0F172A; margin: 0; line-height: 1.2;
  }
  .peq-close {
    background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
    color: #64748B; width: 36px; height: 36px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .peq-close:hover { background: #FEE2E2; color: #DC2626; border-color: #FECACA; }

  /* Product card */
  .peq-product { padding: 0 28px 16px; flex-shrink: 0; }
  .peq-product-inner {
    display: flex; align-items: center; gap: 14px;
    background: #EFF6FF; border: 1px solid #BFDBFE;
    border-radius: 12px; padding: 14px 16px;
  }
  .peq-product-img {
    width: 52px; height: 52px; border-radius: 10px;
    background: #fff; border: 1px solid #E2E8F0;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }
  .peq-product-info { flex: 1; min-width: 0; }
  .peq-product-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #2563EB; margin: 0 0 3px; }
  .peq-product-name { font-size: 15px; font-weight: 600; color: #1E3A8A; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .peq-product-badge {
    display: flex; align-items: center; gap: 5px; flex-shrink: 0;
    background: #1E3A8A; color: #fff;
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 6px 12px; border-radius: 20px;
  }

  .peq-divider { height: 1px; background: #E2E8F0; margin: 0 28px; flex-shrink: 0; }

  /* Scroll body */
  .peq-scroll {
    overflow-y: auto; flex: 1;
    scrollbar-width: thin; scrollbar-color: #CBD5E1 transparent;
  }
  .peq-scroll::-webkit-scrollbar { width: 4px; }
  .peq-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

  /* Form */
  .peq-form { padding: 22px 28px 28px; display: flex; flex-direction: column; gap: 18px; }
  .peq-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .peq-grid-3 { display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 16px; }

  /* Feedback banners */
  .peq-warn {
    display: flex; align-items: flex-start; gap: 10px;
    background: #FFFBEB; border: 1px solid #FDE68A;
    color: #92400E; border-radius: 10px; padding: 12px 14px; font-size: 13px;
  }
  .peq-warn strong { display: block; font-weight: 700; margin-bottom: 2px; }
  .peq-warn p { margin: 0; font-size: 12px; opacity: 0.8; }
  .peq-error {
    display: flex; align-items: flex-start; gap: 10px;
    background: #FEF2F2; border: 1px solid #FECACA;
    color: #991B1B; border-radius: 10px; padding: 12px 14px; font-size: 13px;
  }
  .peq-error strong { display: block; font-weight: 700; margin-bottom: 2px; }
  .peq-error p { margin: 0; font-size: 12px; opacity: 0.8; }

  /* Submit */
  .peq-submit {
    display: flex; align-items: center; justify-content: center; gap: 9px;
    width: 100%; padding: 13px 24px;
    background: linear-gradient(135deg, #1E3A8A, #2563EB);
    color: #fff; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.01em;
    box-shadow: 0 4px 16px rgba(37,99,235,0.3), 0 1px 4px rgba(37,99,235,0.18);
    transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
    margin-top: 2px;
  }
  .peq-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(37,99,235,0.38), 0 2px 6px rgba(37,99,235,0.2);
  }
  .peq-submit:active:not(:disabled) { transform: translateY(0); }
  .peq-submit:disabled { opacity: 0.75; cursor: not-allowed; }

  .peq-spinner {
    width: 17px; height: 17px; border-radius: 50%;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    animation: peq-spin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes peq-spin { to { transform: rotate(360deg); } }

  .peq-trust {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: 11.5px; color: #94A3B8; text-align: center; margin: 0;
  }

  @media (max-width: 560px) {
    .peq-grid-2, .peq-grid-3 { grid-template-columns: 1fr; }
    .peq-header, .peq-form { padding-left: 20px; padding-right: 20px; }
    .peq-product { padding-left: 20px; padding-right: 20px; }
    .peq-divider { margin: 0 20px; }
    .peq-title { font-size: 17px; }
  }
`;