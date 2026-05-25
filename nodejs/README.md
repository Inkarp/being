# Being Email Service

Standalone Vercel Node.js service for website email triggers.

Required Vercel environment variables:

```env
EMAIL_USER=beinglabinstruments@gmail.com
EMAIL_FROM=beinglabinstruments@gmail.com
EMAIL_PASS=your-gmail-app-password
COMPANY_EMAIL=info@beinglab.co.in
MONGODB_URI=...
OTP_SECRET=...
ALLOWED_ORIGIN=https://www.beinglab.co.in
```

Endpoints:

- `GET /api/mail-health`
- `POST /api/send-otp` with `{ "email": "user@example.com" }`
- `POST /api/verify-otp` with `{ "email": "user@example.com", "otp": "123456" }`
- `POST /api/form-email` with `{ "formType": "Price Enquiry", "data": {...} }`

Deploy this folder as the Vercel project root.
