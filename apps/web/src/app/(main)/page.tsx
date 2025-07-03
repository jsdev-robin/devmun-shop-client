import React from 'react';
import HomeHero from '../../components/pages/home/HomeHero';
import HomFeatured from '../../components/pages/home/HomFeatured';
import HomeMunSpecial from '../../components/pages/home/HomeMunSpecial';

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <HomFeatured />
      <HomeMunSpecial />
    </>
  );
};

export default HomePage;
