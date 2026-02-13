'use client';
import { useState } from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import Chatbot from "./Chatbot";

export default function ChatModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Chatbot open={open} onClose={() => setOpen(false)} />

      <button
        onClick={() => setOpen(true)}
        className="
          fixed border-b-2 border-black bottom-6 sm:bottom-8 md:bottom-5 right-2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#2F4191] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
        aria-label="Chat with us"
        title="Chat with us"
      >
        <HiChatBubbleLeftRight className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </button>
    </>
  );
}
