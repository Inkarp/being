'use client';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

const questions = [
  { key: 'name', question: 'What is your name?', type: 'text' },
  { key: 'email', question: 'Your email address?', type: 'email' },
  { key: 'phone', question: 'Your phone number?', type: 'tel' },
  {
    key: 'service',
    question: 'What Prodduct are you interested in?',
    options: ['Ovens', 'Incubators', 'Water Baths'],
  },
  {
    key: 'budget',
    question: 'What is your budget range?',
    options: ['< 1,0000', '20,000 - 30,000', '> 40,000'],
  },
];

export default function Chatbot({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const current = questions[step];
  const isLastStep = step === questions.length - 1 ;

  const saveAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
    setInput('');
    if (!isLastStep) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = questions.map((q) => ({
      question: q.question,
      answer: answers[q.key],
    }));

    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    setStep(0);
    setAnswers({});
    setInput('');
    onClose();
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-[360px] rounded-2xl bg-white shadow-2xl border overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#2F4191] px-4 py-3 text-white">
        <span className="font-semibold">Chat with us</span>
        <button onClick={onClose}>
          <HiX size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-700">{current.question}</p>

        {/* OPTIONS */}
        {current.options ? (
          <div className="flex flex-col gap-2">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => saveAnswer(opt)}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type={current.type}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {!isLastStep && (
              <button
                onClick={() => saveAnswer(input)}
                disabled={!input}
                className="rounded-lg bg-[#2F4191] px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        )}

        {/* FINAL SUBMIT */}
        {isLastStep && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-lg bg-[#2F4191] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B7EC2] disabled:opacity-50"
          >
            {loading ? 'Submitting…' : 'Submit & Send'}
          </button>
        )}
      </div>
    </div>
  );
}
