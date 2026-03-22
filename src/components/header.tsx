import React from "react";
import Button from "./button";
import { Link } from "react-router";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="py-4">
      <div className="@container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="flex-1 text-2xl font-bold">
            Åre Skärm- och Drakflygklubb
          </h1>

          <nav className="flex flex-1 items-center gap-6 justify-center">
            <Link
              to="/nyheter"
              className="text-foreground hover:text-primary transition-colors"
            >
              Nyheter
            </Link>
            <Link
              to="/information"
              className="text-foreground hover:text-primary transition-colors"
            >
              Information
            </Link>
            <Link
              to="/startplatser"
              className="text-foreground hover:text-primary transition-colors"
            >
              Startplatser
            </Link>
          </nav>

          <div className="flex-1 justify-end flex">
            <Button>Bli medlem</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
