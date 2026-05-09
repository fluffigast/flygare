import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import Header from "../components/header";

const MainLayout: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
