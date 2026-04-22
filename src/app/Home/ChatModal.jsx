'use client';
import { useState } from 'react';
import Chatbot from "./Chatbot";
import Image from 'next/image';

export default function ChatModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Chatbot open={open} onClose={() => setOpen(false)} />
      <button
        onClick={() => setOpen(true)}
        className="fixed border border-gray-500 bottom-2 sm:bottom-2 md:bottom-2 right-2 z-40 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        aria-label="Chat with us"
        title="Chat with us">
        <Image src="/assistance.gif" alt='chatbot' width={50} height={40} unoptimized />
      </button>
    </>
  );
}
