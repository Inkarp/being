'use client';
import { useState } from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import Chatbot from "./Chatbot";

export default function ChatModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chatbot Popup */}
      <Chatbot open={open} onClose={() => setOpen(false)} />

      {/* Floating Message Icon */}
     
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-2 z-40 w-16 h-16 rounded-full
                   bg-blue-600 text-white flex items-center justify-center
                   shadow-xl hover:scale-110 transition"
        aria-label="Chat with us"
        title="Chat with us"
      >
        <HiChatBubbleLeftRight size={40} />
      </button>
    </>
  );
}
