import React from 'react';

const StarSellerBadgeIcon: React.FC<{ size?: number }> = ({ size = 16 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M12 6.5L13.7553 10.3136L18 10.8229L14.75 13.7864L15.5107 18L12 15.9864L8.48933 18L9.25 13.7864L6 10.8229L10.2447 10.3136L12 6.5Z" fill="white" />
    </svg>
  );
};

export default StarSellerBadgeIcon;
