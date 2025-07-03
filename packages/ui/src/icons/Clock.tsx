'use client';

import React from 'react';

const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="12" x2="12" y2="7" className="origin-center rotate-[30deg]"></line>
    <line x1="12" y1="12" x2="16" y2="12" className="origin-center rotate-[90deg]"></line>
    <line x1="12" y1="12" x2="12" y2="4" className="origin-center text-red-500 animate-spin duration-[60s]" style={{ animationTimingFunction: 'steps(120, end)' }}></line>
  </svg>
);

export default ClockIcon;
