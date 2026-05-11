import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";

export interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({}) => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <Header />
      <div className="@container px-4 flex gap-8 md:gap-16 flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
