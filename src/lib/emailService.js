const EMAIL_SERVICE_URL =
  process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || "https://being-silk.vercel.app";

function endpoint(path) {
  return `${EMAIL_SERVICE_URL}${path}`;
}

export async function emailServiceFetch(path, options) {
  const res = await fetch(endpoint(path), options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || data?.error || `Email service error ${res.status}`);
  }

  return data;
}

export function sendOtp(email) {
  return emailServiceFetch("/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export function verifyOtp(email, otp) {
  return emailServiceFetch("/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
}

export function submitFormEmail(formType, data) {
  return emailServiceFetch("/api/form-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, data }),
  });
}
