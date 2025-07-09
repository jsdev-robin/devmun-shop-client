import React from 'react';
import HeaderAuth from '../../components/auth/layouts/HeaderAuth';

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAuth />
      <main className="space-y-10 py-4 md:space-y-14 lg:py-6 xl:space-y-20">
        {children}
      </main>
    </>
  );
};

export default LayoutAuth;
