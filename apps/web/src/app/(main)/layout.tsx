import React from 'react';
import Header from '@/components/layouts/Header';
import Navbar from '@/components/layouts/particles/Navbar';
import Footer from '@/components/layouts/Footer';
import Topnav from '../../components/layouts/particles/Topnav';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Topnav />
      <Header />
      <Navbar />
      <main className="space-y-6 py-4 md:space-y-10 lg:py-6 xl:space-y-14">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
