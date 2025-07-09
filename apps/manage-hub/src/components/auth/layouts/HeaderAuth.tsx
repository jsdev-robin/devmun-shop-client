import React from 'react';
import MainLogo from '@repo/ui/components/main-logo';

const HeaderAuth = () => {
  return (
    <header className="py-3 border-b-2 border-border">
      <div className="container">
        <div className="flex items-center justify-between">
          <MainLogo />
        </div>
      </div>
    </header>
  );
};

export default HeaderAuth;
