import React from "react";
import { Link } from "react-router";
import Separator from "./separator";

export interface FooterProps {}

const linkClass =
  "text-muted-foreground hover:text-foreground transition-colors";

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex flex-col gap-16 max-w-2xl mx-auto px-4 w-full @container mt-16">
      <Separator />
      <footer className="mx-auto w-full">
        <div className="flex flex-col gap-8 @sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <h4>Flyga i Åre</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/startplatser" className={linkClass}>
                  Startplatser
                </Link>
              </li>
              <li>
                <Link
                  to="/information/luftrum-are"
                  className={linkClass}
                >
                  Luftrum
                </Link>
              </li>
              <li>
                <Link
                  to="/information/sakerhet-och-ansvar"
                  className={linkClass}
                >
                  Säkerhet och ansvar
                </Link>
              </li>
              <li>
                <Link
                  to="/information/nodinformation"
                  className={linkClass}
                >
                  Nödinformation
                </Link>
              </li>
              <li>
                <Link
                  to="/information/etik-och-hansyn"
                  className={linkClass}
                >
                  Etik och hänsyn
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h4>Klubben</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/nyheter" className={linkClass}>
                  Nyheter
                </Link>
              </li>
              <li>
                <Link to="/information" className={linkClass}>
                  Information
                </Link>
              </li>
              <li>
                <Link
                  to="/information/klubbbussen"
                  className={linkClass}
                >
                  Klubbbussen
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-2 flex-col gap-2">
            <h4>Om Oss</h4>
            <p>
              Åre Skärm- och Drakflygklubb är en ideell förening för skärm- och
              drakflyg i Åreområdet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
