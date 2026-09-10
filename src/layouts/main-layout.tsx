import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";
import PageBackdrop from "../components/decorations/page-backdrop";
import PageHorizon from "../components/decorations/page-horizon";

export interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({}) => {
  return (
    <div className="relative w-full flex flex-col overflow-x-hidden">
      <PageBackdrop />
      <Header />
      <div className="@container flex flex-col items-center w-full">
        <Outlet />
      </div>
      <PageHorizon />
      <Footer />
    </div>
  );
};

export default MainLayout;
