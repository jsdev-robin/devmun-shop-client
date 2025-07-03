import React from "react";
import FooterLinks from "./particles/FooterLinks";

const Footer = () => {
  return (
    <footer className="bg-blue-800">
      <div className="container px-0 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0">
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
