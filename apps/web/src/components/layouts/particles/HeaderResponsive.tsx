import MainLogo from "@repo/ui/components/main-logo";
import React from "react";
import HeaderWidget from "./HeaderWidget";
import HeaderSearch from "./HeaderSearch";
import HeaderCategoriesResponsive from "./HeaderCategoriesResponsive";

const HeaderResponsive = () => {
  return (
    <header className="lg:hidden">
      <div className="pt-2">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <MainLogo />
            <HeaderWidget />
          </div>
        </div>
      </div>
      <div className="border-b-2 border-border py-2">
        <div className="container">
          <div className="flex items-center gap-4">
            <HeaderCategoriesResponsive />
            <HeaderSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderResponsive;
