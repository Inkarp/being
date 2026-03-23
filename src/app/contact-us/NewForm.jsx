// app/components/PardotForm.jsx
"use client";

export default function NewForm() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      <form
        action="https://go.inkarp.co.in/l/1089472/2026-03-23/bllh35"
        method="post"
        className="space-y-4"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded-lg"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded-lg"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#BE0010] text-white py-2 rounded-lg hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
}