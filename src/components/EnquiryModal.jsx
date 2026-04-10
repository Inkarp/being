'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

/* ─────────────────────────────────────────── */
/*  Constants                                  */
/* ─────────────────────────────────────────── */

const INITIAL_STATE = {
  name: '', company: '', industry: '', designation: '',
  department: '', phone: '', email: '',
  country: 'India', state: '', city: '', message: '',
  product: '', category: '',
  // Tracking
  ipAddress: '', referrer: '', source: '', keyword: '',
  deviceType: '', timestamp: '', landingUrl: '',
  pagePath: '', fullUrl: '',
  utm_source: '', utm_medium: '', utm_campaign: '',
  utm_term: '', utm_content: '', gclid: '', fbclid: '',
  // Honeypot
  website: '',
};

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
];

/* ─────────────────────────────────────────── */
/*  Validation helpers                         */
/* ─────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /https?:\/\/|www\./i;
const TEXT_ONLY = /[^a-zA-Z\s]/g;

/* ─────────────────────────────────────────── */
/*  Sub-components                             */
/* ─────────────────────────────────────────── */

function Field({ label, error, children }) {
  return (
    <div className="enq-field">
      {label && <label className="enq-label">{label}</label>}
      {children}
      {error && <span className="enq-field-error">{error}</span>}
    </div>
  );
}

function TextInput({ name, placeholder, value, onChange, type = 'text', required, readOnly, className = '' }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      readOnly={readOnly}
      className={`enq-input ${className}`}
    />
  );
}

/* ─────────────────────────────────────────── */
/*  Main Component                             */
/* ─────────────────────────────────────────── */

export default function EnquiryModal({ isOpen, onClose, productData }) {
  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // OTP
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  /* ── Product auto-fill ── */
  useEffect(() => {
    if (isOpen && productData) {
      setFormData(prev => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
    }
  }, [isOpen, productData]);

  /* ── Tracking ── */
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      let ipAddress = 'Unknown';
      try {
        const r = await fetch('https://api.ipify.org?format=json');
        ipAddress = (await r.json()).ip;
      } catch { }

      const params = new URLSearchParams(window.location.search);
      const pick = k => params.get(k) || '';
      const ua = navigator.userAgent.toLowerCase();

      setFormData(prev => ({
        ...prev,
        ipAddress,
        referrer: document.referrer || 'Direct',
        source: pick('utm_source') || 'Direct',
        keyword: pick('keyword'),
        deviceType: /mobile|android|iphone/.test(ua) ? 'Mobile' : 'Desktop',
        timestamp: new Date().toISOString(),
        landingUrl: window.location.href,
        pagePath: window.location.pathname,
        fullUrl: window.location.href,
        utm_source: pick('utm_source'),
        utm_medium: pick('utm_medium'),
        utm_campaign: pick('utm_campaign'),
        utm_term: pick('utm_term'),
        utm_content: pick('utm_content'),
        gclid: pick('gclid'),
        fbclid: pick('fbclid'),
      }));
    })();
  }, [isOpen]);

  /* ── Change handler ── */
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (URL_RE.test(value)) return;

    if (name === 'name') {
      value = value.replace(/[^a-zA-Z\s.]/g, '');
      value = value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }
    if (['company', 'industry', 'designation', 'department', 'city'].includes(name)) {
      value = value.replace(TEXT_ONLY, '');
    }
    if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    if (name === 'email') {
      value = value.replace(/\s/g, '');
      setOtp(''); setOtpSent(false); setOtpVerified(false); setOtpError('');
    }

    // Clear field-level error on edit
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ── Client-side validation ── */
  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Required';
    if (!formData.company.trim()) e.company = 'Required';
    if (!formData.industry.trim()) e.industry = 'Required';
    if (!formData.designation.trim()) e.designation = 'Required';
    if (!formData.department.trim()) e.department = 'Required';
    if (formData.phone.length !== 10) e.phone = 'Must be 10 digits';
    if (!EMAIL_RE.test(formData.email)) e.email = 'Invalid email';
    if (!otpVerified) e.otp = 'Please verify your email';
    if (!formData.city.trim()) e.city = 'Required';
    if (!formData.state) e.state = 'Required';
    return e;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (formData.website) return; // honeypot

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Submission failed');

      setSubmitted(true);

      // console.log(productData)
      // ✅ Safe tracking
      if (!submitted) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "enquiry_success",
          product_id: productData?.productId || '',
          product_name: productData?.model || ''
        });
      }

      // console.log(window.dataLayer)

      setTimeout(() => {
        handleClose();
        router.push('/thank-you');
      }, 1500);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Close / Reset ── */
  const handleClose = () => {
    setFormData(INITIAL_STATE);
    setErrors({}); setSubmitted(false); setSubmitError('');
    setOtp(''); setOtpSent(false); setOtpVerified(false);
    setOtpError(''); setSendOtpLoading(false); setVerifyOtpLoading(false);
    onClose();
  };

  /* ── OTP ── */
  const handleSendOtp = async () => {
    if (!formData.email) { setOtpError('Enter your email first'); return; }
    if (!EMAIL_RE.test(formData.email)) { setOtpError('Enter a valid email first'); return; }
    setSendOtpLoading(true); setOtpError('');
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Unable to send OTP');
      setOtpSent(true);
    } catch (err) {
      setOtpError(err.message || 'Failed to send OTP');
    } finally {
      setSendOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) return;
    setVerifyOtpLoading(true); setOtpError('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
        setErrors(prev => ({ ...prev, otp: '' }));
      } else {
        throw new Error(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setOtpVerified(false);
      setOtpError(err.message || 'Verification failed');
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  if (!isOpen) return null;

  /* ─────────────────────────────────────────── */
  /*  Render                                     */
  /* ─────────────────────────────────────────── */
  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .enq-overlay {
          font-family: 'DM Sans', sans-serif;
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: enq-fade-in 0.2s ease;
        }
        @keyframes enq-fade-in { from { opacity: 0 } to { opacity: 1 } }

        .enq-card {
          background: #fff;
          border-radius: 20px;
          width: 100%; max-width: 560px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 24px 64px rgba(15,23,42,0.18);
          animation: enq-slide-up 0.25s cubic-bezier(0.34,1.56,0.64,1);
          scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent;
        }
        @keyframes enq-slide-up { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .enq-header {
          position: sticky; top: 0; z-index: 10;
          background: #fff;
          border-bottom: 1px solid #f1f5f9;
          padding: 20px 24px 16px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .enq-title { font-size: 17px; font-weight: 600; color: #0f172a; letter-spacing: -0.3px; }
        .enq-subtitle { font-size: 12px; color: #94a3b8; margin-top: 2px; }

        .enq-close-btn {
          width: 32px; height: 32px;
          border-radius: 50%; border: none; cursor: pointer;
          background: #f1f5f9; color: #64748b;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .enq-close-btn:hover { background: #e2e8f0; color: #0f172a; }

        .enq-product-badge {
          margin: 0 24px 16px;
          margin-top: 16px;
          padding: 10px 14px;
          background: #f0f5ff;
          border: 1px solid #c7d7fd;
          border-radius: 10px;
          font-size: 13px; color: #3730a3;
          display: flex; align-items: center; gap: 8px;
        }
        .enq-product-badge span { font-weight: 600; }

        .enq-body { padding: 0 24px 24px; }

        .enq-section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.8px;
          text-transform: uppercase; color: #94a3b8;
          margin: 20px 0 10px;
        }

        .enq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .enq-grid-full { grid-column: 1 / -1; }

        .enq-field { display: flex; flex-direction: column; gap: 4px; }
        .enq-label { font-size: 12px; font-weight: 500; color: #475569; }
        .enq-field-error { font-size: 11px; color: #ef4444; }

        .enq-input {
          width: 100%; box-sizing: border-box;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 13px;
          font-size: 13.5px; color: #0f172a;
          font-family: inherit;
          background: #fafafa;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .enq-input::placeholder { color: #0a181f; }
        .enq-input:focus {
          border-color: #2F4191;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(47,65,145,0.08);
        }
        .enq-input.error { border-color: #ef4444; }
        .enq-input:read-only { background: #f8fafc; color: #94a3b8; cursor: default; }

        .enq-phone-wrap { display: flex; gap: 0; }
        .enq-phone-prefix {
          padding: 9px 11px;
          background: #f1f5f9; border: 1.5px solid #e2e8f0;
          border-right: none; border-radius: 10px 0 0 10px;
          font-size: 13px; color: #475569; font-weight: 500;
          white-space: nowrap; display: flex; align-items: center;
        }
        .enq-phone-wrap .enq-input { border-radius: 0 10px 10px 0; }

        .enq-select {
          width: 100%; box-sizing: border-box;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          padding: 9px 13px; font-size: 13.5px; color: #0f172a;
          font-family: inherit; background: #fafafa;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          cursor: pointer; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .enq-select:focus { border-color: #2F4191; box-shadow: 0 0 0 3px rgba(47,65,145,0.08); }
        .enq-select.error { border-color: #ef4444; }

        .enq-textarea {
          width: 100%; box-sizing: border-box;
          border: 1.5px solid #e2e8f0; border-radius: 10px;
          padding: 9px 13px; font-size: 13.5px; color: #0f172a;
          font-family: inherit; background: #fafafa; resize: vertical;
          min-height: 80px; outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }
        .enq-textarea::placeholder { color: #b0bec5; }
        .enq-textarea:focus {
          border-color: #2F4191; background: #fff;
          box-shadow: 0 0 0 3px rgba(47,65,145,0.08);
        }

        /* OTP row */
        .enq-otp-row { display: flex; gap: 8px; align-items: flex-start; }
        .enq-otp-row .enq-input { flex: 1; }
        .enq-otp-block { margin-top: 8px; }

        /* Pill buttons (OTP actions) */
        .enq-pill-btn {
          white-space: nowrap; flex-shrink: 0;
          padding: 9px 14px; border-radius: 10px; border: none; cursor: pointer;
          font-size: 12.5px; font-weight: 600; font-family: inherit;
          background: #2F4191; color: #fff;
          transition: background 0.15s, opacity 0.15s;
          display: flex; align-items: center; gap: 6px;
        }
        .enq-pill-btn:hover:not(:disabled) { background: #263580; }
        .enq-pill-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .enq-pill-btn.verified { background: #16a34a; }

        /* OTP error / success */
        .enq-otp-error { font-size: 11.5px; color: #ef4444; margin-top: 4px; }
        .enq-verified-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; color: #16a34a; font-weight: 500; margin-top: 4px;
        }

        /* Submit */
        .enq-submit {
          width: 100%; margin-top: 20px;
          padding: 13px; border-radius: 12px; border: none; cursor: pointer;
          font-size: 14px; font-weight: 600; font-family: inherit;
          background: #2F4191; color: #fff;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(47,65,145,0.25);
        }
        .enq-submit:hover:not(:disabled) {
          background: #263580;
          box-shadow: 0 6px 20px rgba(47,65,145,0.35);
          transform: translateY(-1px);
        }
        .enq-submit:active:not(:disabled) { transform: translateY(0); }
        .enq-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .enq-submit.success { background: #16a34a; box-shadow: 0 4px 14px rgba(22,163,74,0.3); }

        /* Global error banner */
        .enq-error-banner {
          display: flex; align-items: center; gap: 8px;
          margin-top: 14px; padding: 10px 14px;
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; font-size: 12.5px; color: #dc2626;
        }

        /* Spinner */
        .enq-spin { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg) } }

        /* Divider */
        .enq-divider { height: 1px; background: #f1f5f9; margin: 16px 0 0; }

        @media (max-width: 480px) {
          .enq-grid { grid-template-columns: 1fr; }
          .enq-card { border-radius: 16px; }
        }
      `}</style>

      <div className="enq-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div className="enq-card" role="dialog" aria-modal="true" aria-label="Product Enquiry">

          {/* ── Header ── */}
          <div className="enq-header">
            <div>
              <div className="enq-title">Product Enquiry</div>
              <div className="enq-subtitle">Fill in the details and we'll get back to you</div>
            </div>
            <button className="enq-close-btn" onClick={handleClose} aria-label="Close">
              <FaTimes size={12} />
            </button>
          </div>

          {/* ── Product badge ── */}
          {productData && (
            <div className="enq-product-badge">
              🔖 Enquiring about: <span>{productData.model}</span>
            </div>
          )}
          {/* ── Form ── */}
          <div className="enq-body">
            <form onSubmit={handleSubmit} id={`enquiry-form-${productData?.productId}`} noValidate>
              {/* Honeypot */}
              <input type="text" name="website" style={{ display: 'none' }} onChange={handleChange} tabIndex={-1} autoComplete="off" />

              {/* Contact info */}
              {/* <div className="enq-section-label">Contact Information</div> */}
              <div className="enq-grid">
                <Field error={errors.name}>
                  <TextInput name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className={errors.name ? 'error' : ''} />
                </Field>
                <Field error={errors.company}>
                  <TextInput name="company" placeholder="Company *" value={formData.company} onChange={handleChange} required className={errors.company ? 'error' : ''} />
                </Field>
                <Field error={errors.designation}>
                  <TextInput name="designation" placeholder="Designation *" value={formData.designation} onChange={handleChange} required className={errors.designation ? 'error' : ''} />
                </Field>
                <Field error={errors.department}>
                  <TextInput name="department" placeholder="Department *" value={formData.department} onChange={handleChange} required className={errors.department ? 'error' : ''} />
                </Field>
                <Field error={errors.industry} className="enq-grid-full" style={{ gridColumn: '1 / -1' }}>
                  <TextInput name="industry" placeholder="Industry *" value={formData.industry} onChange={handleChange} required className={errors.industry ? 'error' : ''} />
                </Field>
                <Field error={errors.phone}>
                  <div className="enq-phone-wrap">
                    <span className="enq-phone-prefix">🇮🇳 +91</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="10-digit phone number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`enq-input ${errors.phone ? 'error' : ''}`}
                    />
                  </div>
                </Field>
              </div>


              {/* Email + OTP */}
              <div style={{ marginTop: 10 }}>
                <Field error={errors.email}>
                  <div className="enq-otp-row">
                    <input
                      name="email"
                      type="email"
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`enq-input ${errors.email ? 'error' : ''}`}
                    />
                    {!otpVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={sendOtpLoading || otpSent || !formData.email}
                        className="enq-pill-btn"
                      >
                        {sendOtpLoading ? <FaSpinner className="enq-spin" size={11} /> : null}
                        {sendOtpLoading ? 'Sending…' : otpSent ? 'OTP Sent ✓' : 'Send OTP'}
                      </button>
                    )}
                    {otpVerified && (
                      <button type="button" disabled className="enq-pill-btn verified">
                        <FaCheckCircle size={11} /> Verified
                      </button>
                    )}
                  </div>
                </Field>

                {otpSent && !otpVerified && (
                  <div className="enq-otp-block">
                    <div className="enq-otp-row">
                      <input
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                        className={`enq-input ${errors.otp ? 'error' : ''}`}
                        style={{ fontFamily: "'DM Mono', monospace", letterSpacing: '3px' }}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={verifyOtpLoading || !otp}
                        className="enq-pill-btn"
                      >
                        {verifyOtpLoading ? <FaSpinner className="enq-spin" size={11} /> : null}
                        {verifyOtpLoading ? 'Checking…' : 'Verify'}
                      </button>
                    </div>
                    {otpError && <div className="enq-otp-error">{otpError}</div>}
                    {errors.otp && <div className="enq-otp-error">{errors.otp}</div>}
                  </div>
                )}

                {otpVerified && (
                  <div className="enq-verified-badge"><FaCheckCircle size={12} /> Email verified</div>
                )}
              </div>

              {/* Location */}
              {/* <div className="enq-section-label" style={{ marginTop: 20 }}>Location</div> */}
              <div className="enq-grid mt-2">
                <Field error={errors.city}>
                  <TextInput name="city" placeholder="City *" value={formData.city} onChange={handleChange} required className={errors.city ? 'error' : ''} />
                </Field>
                <Field error={errors.state}>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={`enq-select ${errors.state ? 'error' : ''}`}
                  >
                    <option value="">Select State *</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <div style={{ gridColumn: '1 / -1' }}>
                  <TextInput name="country" value="India" readOnly className="enq-input" />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginTop: 14 }}>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Message (optional) — tell us more about your requirements"
                  value={formData.message}
                  onChange={handleChange}
                  className="enq-textarea"
                />
              </div>

              {/* Error banner */}
              {submitError && (
                <div className="enq-error-banner">
                  <span>⚠</span> {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                id={`enquiry-btn-${productData?.productId}`}
                disabled={loading || submitted}
                className={`enq-submit ${submitted ? 'success' : ''}`}
              >
                {loading && <><FaSpinner className="enq-spin" size={13} /> Submitting…</>}
                {submitted && <><FaCheckCircle size={13} /> Enquiry Sent Successfully!</>}
                {!loading && !submitted && <><FaPaperPlane size={12} /> Send Enquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}