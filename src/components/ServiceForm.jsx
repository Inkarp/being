'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_STATE = {
  name: '', company: '', designation: '', department: '',
  phone: '', email: '', country: '', state: '', city: '',
  message: '', product: '', category: '',
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconCheck = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconWrench = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Field helpers ────────────────────────────────────────────────────────────

function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569', marginBottom: 6 }}
    >
      {children}
      <span style={{ color: '#EF4444', marginLeft: 3 }}>*</span>
    </label>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function FocusInput({ name, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={name} name={name} type={type} placeholder={placeholder}
      value={value} onChange={onChange} required={required}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focused ? '#2563EB' : '#CBD5E1'}`,
        borderRadius: 10, padding: '10px 14px',
        fontSize: 14, fontFamily: 'inherit',
        color: '#0F172A', background: '#fff', outline: 'none',
        boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
      }}
    />
  );
}

function FocusTextarea({ name, placeholder, value, onChange, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={name} name={name} rows={rows} placeholder={placeholder}
      value={value} onChange={onChange}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: '100%', boxSizing: 'border-box',
        border: `1.5px solid ${focused ? '#2563EB' : '#CBD5E1'}`,
        borderRadius: 10, padding: '10px 14px',
        fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6,
        color: '#0F172A', background: '#fff', outline: 'none',
        resize: 'vertical', minHeight: 96,
        boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
      }}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServiceForm({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading,  setLoading]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,    setError]    = useState('');
  const [visible,  setVisible]  = useState(false);
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
      setFormData(prev => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
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
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
      setTimeout(handleClose, 2000);    
    } catch (err) {
      console.error(err);
      setError('Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{css}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`sf-overlay ${visible ? 'sf-overlay--in' : ''}`}
        onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        role="dialog" aria-modal="true" aria-label="Service Enquiry"
      >
        {/* Card */}
        <div className={`sf-card ${visible ? 'sf-card--in' : ''}`}>

          {/* Accent bar */}
          <div className="sf-accent-bar" />

          {/* ── HEADER ── */}
          <div className="sf-header">
            <div className="sf-header-left">
              <span className="sf-icon-badge"><IconWrench /></span>
              <div>
                <p className="sf-eyebrow">Service Request</p>
                <h2 className="sf-title">Service Enquiry</h2>
              </div>
            </div>
            <button onClick={handleClose} className="sf-close" aria-label="Close">
              <IconClose />
            </button>
          </div>

          {/* ── PRODUCT TAG ── */}
          {productData && (
            <div className="sf-product">
              <div className="sf-product-inner">
                <div>
                  <p className="sf-product-eyebrow">Product</p>
                  <p className="sf-product-name">{productData.model}</p>
                </div>
                {/* {(productData.category || productData.subcategory) && (
                  <span className="sf-product-path">
                    {[productData.category, productData.subcategory].filter(Boolean).join(' → ')}
                  </span>
                )} */}
              </div>
            </div>
          )}

          <div className="sf-divider" />

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="sf-form" noValidate>

            {/* Row 1 */}
            <div className="sf-row">
              <Field label="Full Name">
                <FocusInput name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </Field>
              <Field label="Company">
                <FocusInput name="company" placeholder="Acme Corp" value={formData.company} onChange={handleChange} required />
              </Field>
            </div>

            {/* Row 2 */}
            <div className="sf-row">
              <Field label="Designation">
                <FocusInput name="designation" placeholder="e.g. Engineer" value={formData.designation} onChange={handleChange} required />
              </Field>
              <Field label="Department">
                <FocusInput name="department" placeholder="e.g. Maintenance" value={formData.department} onChange={handleChange} required />
              </Field>
            </div>

            {/* Row 3 */}
            <div className="sf-row">
              <Field label="Phone Number">
                <FocusInput name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
              </Field>
              <Field label="Email">
                <FocusInput name="email" type="email" placeholder="john@acme.com" value={formData.email} onChange={handleChange} required />
              </Field>
            </div>

            {/* Row 4 — Location */}
            <div className="sf-row sf-row--3">
              <Field label="Country">
                <FocusInput name="country" placeholder="India" value={formData.country} onChange={handleChange} required />
              </Field>
              <Field label="State">
                <FocusInput name="state" placeholder="Telangana" value={formData.state} onChange={handleChange} required />
              </Field>
              <Field label="City">
                <FocusInput name="city" placeholder="Hyderabad" value={formData.city} onChange={handleChange} required />
              </Field>
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569', marginBottom: 6 }}>
                Message / Issue Description
              </label>
              <FocusTextarea
                name="message"
                placeholder="Describe the issue, service required, or any specific instructions…"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="sf-error">
                <IconAlert />{error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || submitted}
              className={`sf-submit ${submitted ? 'sf-submit--done' : ''}`}
            >
              {loading  && <><span className="sf-spinner" />Sending…</>}
              {!loading && submitted && <><IconCheck />Enquiry Sent!</>}
              {!loading && !submitted && <><IconSend />Send Enquiry</>}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  .sf-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(15,23,42,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 16px;
    opacity: 0; transition: opacity 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .sf-overlay--in { opacity: 1; }

  .sf-card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 24px 64px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.06);
    max-width: 580px; width: 100%; max-height: 92vh;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    transform: translateY(20px) scale(0.98); opacity: 0;
    transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease;
  }
  .sf-card--in { transform: translateY(0) scale(1); opacity: 1; }

  .sf-accent-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #1E3A8A, #3B82F6);
    border-radius: 16px 16px 0 0; flex-shrink: 0;
  }

  .sf-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 28px 28px 18px; gap: 12px; flex-shrink: 0;
  }
  .sf-header-left { display: flex; align-items: center; gap: 14px; }
  .sf-icon-badge {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
    color: #1E3A8A;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(37,99,235,0.15);
  }
  .sf-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: #2563EB; margin: 0 0 3px;
  }
  .sf-title {
    font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 400;
    color: #0F172A; margin: 0; line-height: 1.2;
  }
  .sf-close {
    background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
    color: #64748B; width: 36px; height: 36px; flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
  }
  .sf-close:hover { background: #FEE2E2; color: #DC2626; border-color: #FECACA; }

  /* Product tag */
  .sf-product { padding: 0 28px 14px; flex-shrink: 0; }
  .sf-product-inner {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
    background: #EFF6FF; border: 0.5px solid #BFDBFE; border-radius: 10px; padding: 12px 16px;
  }
  .sf-product-eyebrow {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #2563EB; margin: 0 0 2px;
  }
  .sf-product-name { font-size: 14px; font-weight: 600; color: #1E3A8A; margin: 0; }
  .sf-product-path {
    font-size: 11.5px; color: #64748B; background: #fff;
    border: 0.5px solid #E2E8F0; border-radius: 20px; padding: 3px 10px; white-space: nowrap;
  }

  .sf-divider { height: 1px; background: #E2E8F0; margin: 0 28px; flex-shrink: 0; }

  /* Form */
  .sf-form {
    padding: 20px 28px 28px; display: flex; flex-direction: column; gap: 16px;
    overflow-y: auto; flex: 1;
    scrollbar-width: thin; scrollbar-color: #CBD5E1 transparent;
  }
  .sf-form::-webkit-scrollbar { width: 4px; }
  .sf-form::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }

  .sf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .sf-row--3 { grid-template-columns: 1fr 1fr 1fr; }

  /* Error */
  .sf-error {
    display: flex; align-items: center; gap: 7px;
    background: #FEF2F2; border: 1px solid #FECACA;
    color: #DC2626; font-size: 13px; font-weight: 500;
    border-radius: 8px; padding: 10px 14px;
  }

  /* Submit */
  .sf-submit {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px 24px; margin-top: 2px;
    background: linear-gradient(135deg, #1E3A8A, #2563EB);
    color: #fff; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.01em;
    box-shadow: 0 4px 16px rgba(37,99,235,0.28), 0 1px 4px rgba(37,99,235,0.18);
    transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s, background 0.18s;
  }
  .sf-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(37,99,235,0.38);
  }
  .sf-submit:active:not(:disabled) { transform: translateY(0); }
  .sf-submit:disabled { opacity: 0.8; cursor: not-allowed; }
  .sf-submit--done {
    background: linear-gradient(135deg, #059669, #10B981) !important;
    box-shadow: 0 4px 16px rgba(5,150,105,0.28) !important;
  }

  .sf-spinner {
    width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid rgba(255,255,255,0.35); border-top-color: #fff;
    animation: sf-spin 0.7s linear infinite;
  }
  @keyframes sf-spin { to { transform: rotate(360deg); } }

  @media (max-width: 520px) {
    .sf-row, .sf-row--3 { grid-template-columns: 1fr; }
    .sf-header, .sf-form { padding-left: 20px; padding-right: 20px; }
    .sf-product { padding-left: 20px; padding-right: 20px; }
    .sf-divider { margin: 0 20px; }
  }
`;