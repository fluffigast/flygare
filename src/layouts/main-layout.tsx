import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";

export interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({}) => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <Header />
      <div className="@container flex flex-col items-center w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
