import React from 'react';
import Header from '../../components/layouts/Header';
import Navbar from '../../components/layouts/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main className="py-6 space-y-6">{children}</main>
    </>
  );
};

export default MainLayout;
