"use client";

export default function NewForm() {
  return (
    <>
      {/* INLINE CSS */}
      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 24px;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          font-family: Arial, sans-serif;
        }

        .title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #222;
          text-align: center;
        }

        .input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 12px;
          outline: none;
          transition: all 0.2s ease;
        }

        .input:focus {
          border-color: #BE0010;
          box-shadow: 0 0 0 2px rgba(190, 0, 16, 0.1);
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .btn {
          width: 100%;
          background: #BE0010;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn:hover {
          opacity: 0.9;
        }

        textarea.input {
          min-height: 90px;
          resize: none;
        }

        @media (max-width: 600px) {
          .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* FORM */}
      <form
        action="https://go.inkarp.co.in/l/1089472/2026-03-23/bllh32"
        method="post"
        className="form-container"
      >
        <h2 className="title">Enquiry Form</h2>

        <div className="row">
          <input name="name" placeholder="Full Name" required className="input" />
          <input name="company" placeholder="Company" required className="input" />
        </div>

        <div className="row">
          <input name="industry" placeholder="Industry" required className="input" />
          <input name="designation" placeholder="Designation" required className="input" />
        </div>

        <input name="department" placeholder="Department" required className="input" />

        <div className="row">
          <input type="email" name="email" placeholder="Email" required className="input" />
          <input name="phone" placeholder="Phone" required className="input" />
        </div>

        <div className="row">
          <input name="state" placeholder="State" required className="input" />
          <input name="city" placeholder="City" required className="input" />
        </div>

        <div className="row">
          <select name="typeOfCustomer" required className="input">
            <option value="">Type Of Customer</option>
            <option value="Existing Customer">Existing Customer</option>
            <option value="New Customer">New Customer</option>
          </select>

          <select name="purchasePlan" required className="input">
            <option value="">Purchase Plan</option>
            <option value="1-3 Months">1-3 Months</option>
            <option value="3-6 Months">3-6 Months</option>
            <option value="After 6 Months">After 6 Months</option>
          </select>
        </div>

        <textarea name="message" placeholder="Message" className="input"></textarea>

        {/* Hidden Fields */}
        <input type="hidden" name="source" value="website" />
        <input
          type="hidden"
          name="redirect_url"
          value="https://inkarp.co.in/thank-you"
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
}