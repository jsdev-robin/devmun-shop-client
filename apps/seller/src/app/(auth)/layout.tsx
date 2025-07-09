import React from 'react';
import MainLogo from '@repo/ui/components/main-logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="py-3 border-b-2 border-border">
        <div className="container">
          <div className="flex items-center justify-between">
            <MainLogo />
          </div>
        </div>
      </header>
      <main className="space-y-10 py-4 md:space-y-14 lg:py-6 xl:space-y-20">
        {children}
      </main>
    </>
  );
};

export default AuthLayout;
