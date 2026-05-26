'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Spinner Wrapper */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          
          {/* Rotating Circle */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

          {/* Slightly Rotating Image */}
          <Image
            src="/favicon.png"
            alt="Loading"
            width={30}
            height={30}
            priority
            className="animate-x-rotate infinite object-contain"
          />
        </div>
      </div>
    </div>
  );
}
