'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const INITIAL_STATE = {
  name: '',
  company: '',
  designation: '',
  department: '',
  phone: '',
  email: '',
  country: 'India',
  state: '',
  city: '',
  message: '',
  product: '',
  category: '',
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
  "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
  "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

/* ─── Tiny field components ─────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="ep-field">
      <label className="ep-label">{label}</label>
      {children}
    </div>
  );
}

/* ─── Icons (inline SVG — zero extra deps) ─────────────────────── */
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconHandshake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l1.06 1.06L12 21.23l7.36-7.94 1.06-1.06a5.4 5.4 0 0 0 0-7.65z"/>
  </svg>
);

/* ─── Main component ────────────────────────────────────────────── */
export default function ExclusivePartner({ isOpen, onClose, productData }) {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  /* Animate in */
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
      setFormData(prev => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
    }
  }, [isOpen, productData]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setFormData(INITIAL_STATE);
      setSubmitted(false);
      setError('');
      onClose();
    }, 280);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/exclusivePatner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, country: 'India' }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
        router.push('/thank-you');
      }, 1800);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* Click-outside to close */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!isOpen) return null;

  const inputBase = "ep-input";

  return (
    <>
      <style>{styles}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`ep-overlay ${visible ? 'ep-overlay--in' : ''}`}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Exclusive Partnership Form"
      >
        {/* Modal card */}
        <div className={`ep-card ${visible ? 'ep-card--in' : ''}`}>

          {/* Left accent strip */}
          <div className="ep-accent-strip" aria-hidden="true" />

          {/* Header */}
          <div className="ep-header">
            <div className="ep-header-left">
              <span className="ep-icon-badge"><IconHandshake /></span>
              <div>
                <p className="ep-eyebrow">Partnership Enquiry</p>
                <h2 className="ep-title">Become an Exclusive Partner</h2>
              </div>
            </div>
            <button onClick={handleClose} className="ep-close" aria-label="Close">
              <IconClose />
            </button>
          </div>

          {/* Product tag (if present) */}
          {/* {formData.product && (
            <div className="ep-product-tag">
              <span className="ep-product-dot" />
              {formData.product}
              {formData.category && <span className="ep-product-cat">· {formData.category}</span>}
            </div>
          )} */}

          {/* Divider */}
          <div className="ep-divider" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="ep-form" noValidate>

            {/* Row 1 */}
            <div className="ep-row">
              <Field label="Full Name *">
                <input name="name" required placeholder="John Doe"
                  value={formData.name} onChange={handleChange} className={inputBase} />
              </Field>
              <Field label="Company *">
                <input name="company" required placeholder="Acme Corp"
                  value={formData.company} onChange={handleChange} className={inputBase} />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="ep-row">
              <Field label="Designation *">
                <input name="designation" required placeholder="e.g. Director"
                  value={formData.designation} onChange={handleChange} className={inputBase} />
              </Field>
              <Field label="Department *">
                <input name="department" required placeholder="e.g. Sales"
                  value={formData.department} onChange={handleChange} className={inputBase} />
              </Field>
            </div>

            {/* Row 3 */}
            <div className="ep-row">
              <Field label="Phone Number *">
                <input name="phone" required type="tel" placeholder="+91 98765 43210"
                  value={formData.phone} onChange={handleChange} className={inputBase} />
              </Field>
              <Field label="Email Address *">
                <input name="email" required type="email" placeholder="john@acme.com"
                  value={formData.email} onChange={handleChange} className={inputBase} />
              </Field>
            </div>

            {/* Row 4 — Location */}
            <div className="ep-row ep-row--3">
              <Field label="Country">
                <input name="country" value={formData.country} readOnly
                  className={`${inputBase} ep-input--readonly`} />
              </Field>
              <Field label="State *">
                <select name="state" required value={formData.state} onChange={handleChange}
                  className={`${inputBase} ep-select`}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="City *">
                <input name="city" required placeholder="Your City"
                  value={formData.city} onChange={handleChange} className={inputBase} />
              </Field>
            </div>

            {/* Message */}
            <Field label="Message">
              <textarea name="message" rows={4} placeholder="Tell us about your business goals and what you're looking for in a partnership…"
                value={formData.message} onChange={handleChange}
                className={`${inputBase} ep-textarea`} />
            </Field>

            {/* Error */}
            {error && (
              <div className="ep-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || submitted}
              className={`ep-submit ${submitted ? 'ep-submit--done' : ''} ${loading ? 'ep-submit--loading' : ''}`}
            >
              {loading && (
                <span className="ep-spinner" aria-hidden="true" />
              )}
              {!loading && submitted && <><IconCheck /> Enquiry Sent!</>}
              {!loading && !submitted && <><IconSend /> Send Enquiry</>}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

/* ─── Styles ────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  /* Tokens */
  :root {
    --ep-primary:   #1E3A8A;
    --ep-accent:    #2563EB;
    --ep-accent2:   #3B82F6;
    --ep-success:   #059669;
    --ep-error:     #DC2626;
    --ep-text:      #0F172A;
    --ep-muted:     #64748B;
    --ep-border:    #E2E8F0;
    --ep-bg:        #FFFFFF;
    --ep-surface:   #F8FAFC;
    --ep-radius:    10px;
    --ep-shadow:    0 24px 64px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.06);
    --ep-font:      'DM Sans', sans-serif;
    --ep-font-d:    'DM Serif Display', serif;
    --ep-trans:     0.22s cubic-bezier(0.4,0,0.2,1);
  }

  /* Overlay */
  .ep-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(15,23,42,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    opacity: 0;
    transition: opacity var(--ep-trans);
  }
  .ep-overlay--in { opacity: 1; }

  /* Card */
  .ep-card {
    background: var(--ep-bg);
    border-radius: 16px;
    box-shadow: var(--ep-shadow);
    max-width: 600px; width: 100%;
    max-height: 92vh; overflow-y: auto;
    position: relative;
    transform: translateY(20px) scale(0.98);
    opacity: 0;
    transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease;
    font-family: var(--ep-font);
    scrollbar-width: thin;
    scrollbar-color: var(--ep-border) transparent;
  }
  .ep-card--in { transform: translateY(0) scale(1); opacity: 1; }
  .ep-card::-webkit-scrollbar { width: 4px; }
  .ep-card::-webkit-scrollbar-track { background: transparent; }
  .ep-card::-webkit-scrollbar-thumb { background: var(--ep-border); border-radius: 4px; }

  /* Accent strip */
  .ep-accent-strip {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--ep-primary), var(--ep-accent2));
    border-radius: 16px 16px 0 0;
  }

  /* Header */
  .ep-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 28px 28px 20px;
    gap: 12px;
  }
  .ep-header-left { display: flex; align-items: center; gap: 14px; }
  .ep-icon-badge {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
    color: var(--ep-primary);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(37,99,235,0.15);
  }
  .ep-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--ep-accent);
    margin: 0 0 3px;
  }
  .ep-title {
    font-family: var(--ep-font-d); font-size: 20px;
    color: var(--ep-text); margin: 0; line-height: 1.2;
    font-weight: 400;
  }

  /* Close */
  .ep-close {
    background: var(--ep-surface); border: 1px solid var(--ep-border);
    border-radius: 8px; color: var(--ep-muted);
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background var(--ep-trans), color var(--ep-trans);
    flex-shrink: 0; margin-top: 2px;
  }
  .ep-close:hover { background: #FEE2E2; color: var(--ep-error); border-color: #FECACA; }

  /* Product tag */
  .ep-product-tag {
    margin: 0 28px 4px;
    display: inline-flex; align-items: center; gap: 7px;
    background: #EFF6FF; border: 1px solid #BFDBFE;
    color: var(--ep-accent); font-size: 12.5px; font-weight: 500;
    border-radius: 20px; padding: 4px 12px;
  }
  .ep-product-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--ep-accent2);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:0.5; transform: scale(0.8); }
  }
  .ep-product-cat { color: var(--ep-muted); font-weight: 400; }

  /* Divider */
  .ep-divider {
    height: 1px; background: var(--ep-border); margin: 16px 28px 0;
  }

  /* Form */
  .ep-form { padding: 20px 28px 28px; display: flex; flex-direction: column; gap: 16px; }
  .ep-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ep-row--3 { grid-template-columns: 1fr 1.4fr 1fr; }
  @media (max-width: 520px) {
    .ep-row, .ep-row--3 { grid-template-columns: 1fr; }
    .ep-header { padding: 22px 20px 16px; }
    .ep-form { padding: 16px 20px 24px; }
    .ep-divider { margin: 12px 20px 0; }
    .ep-product-tag { margin: 0 20px 4px; }
  }

  /* Label */
  .ep-field { display: flex; flex-direction: column; gap: 6px; }
  .ep-label {
    font-size: 12px; font-weight: 600; color: var(--ep-muted);
    letter-spacing: 0.04em; text-transform: uppercase;
  }

  /* Input / select / textarea */
  .ep-input {
    width: 100%; box-sizing: border-box;
    border: 1.5px solid var(--ep-border); border-radius: var(--ep-radius);
    padding: 10px 14px; font-size: 14px; font-family: var(--ep-font);
    color: var(--ep-text); background: var(--ep-bg);
    transition: border-color var(--ep-trans), box-shadow var(--ep-trans), background var(--ep-trans);
    outline: none; appearance: none;
  }
  .ep-input::placeholder { color: #94A3B8; }
  .ep-input:focus {
    border-color: var(--ep-accent2);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
    background: #FAFCFF;
  }
  .ep-input--readonly {
    background: var(--ep-surface); color: var(--ep-muted);
    cursor: not-allowed; border-style: dashed;
  }
  .ep-select {
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
  .ep-textarea {
    resize: vertical; min-height: 96px; border-radius: var(--ep-radius);
    line-height: 1.6;
  }

  /* Error */
  .ep-error {
    display: flex; align-items: center; gap: 7px;
    background: #FEF2F2; border: 1px solid #FECACA;
    color: var(--ep-error); font-size: 13px; font-weight: 500;
    border-radius: 8px; padding: 10px 14px;
  }

  /* Submit */
  .ep-submit {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px 24px;
    background: linear-gradient(135deg, var(--ep-primary), var(--ep-accent));
    color: #fff; border: none; border-radius: var(--ep-radius);
    font-family: var(--ep-font); font-size: 14.5px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.01em;
    box-shadow: 0 4px 16px rgba(37,99,235,0.28), 0 1px 4px rgba(37,99,235,0.2);
    transition: transform var(--ep-trans), box-shadow var(--ep-trans), opacity var(--ep-trans);
    margin-top: 4px;
  }
  .ep-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(37,99,235,0.36), 0 2px 6px rgba(37,99,235,0.2);
  }
  .ep-submit:active:not(:disabled) { transform: translateY(0); }
  .ep-submit:disabled { opacity: 0.8; cursor: not-allowed; }
  .ep-submit--done {
    background: linear-gradient(135deg, var(--ep-success), #10B981) !important;
    box-shadow: 0 4px 16px rgba(5,150,105,0.28) !important;
  }

  /* Spinner */
  .ep-spinner {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;