import React from 'react';
import SellerSalesReport from '../../../../components/hub/seller/pages/overview/SellerSalesReport';
import SellerOrderReport from '../../../../components/hub/seller/pages/overview/SellerOrderReport';

const SellerOverviewPage = () => {
  return (
    <>
      <SellerSalesReport />
      <SellerOrderReport />
    </>
  );
};

export default SellerOverviewPage;
