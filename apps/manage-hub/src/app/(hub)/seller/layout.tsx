import React from 'react';
import SellerHeader from '../../../components/hub/seller/layouts/SellerHeader';
import SellerNavbar from '../../../components/hub/seller/layouts/SellerNavbar';

const LayoutSellerMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SellerHeader />
      <SellerNavbar />
      <main className="py-6 space-y-6">{children}</main>
    </>
  );
};

export default LayoutSellerMain;
