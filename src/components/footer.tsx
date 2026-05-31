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
                <Link to="/flyga-i-are/startplatser" className={linkClass}>
                  Startplatser
                </Link>
              </li>
              <li>
                <Link
                  to="/flyga-i-are/luftrum-are"
                  className={linkClass}
                >
                  Luftrum
                </Link>
              </li>
              <li>
                <Link
                  to="/flyga-i-are/sakerhet-och-ansvar"
                  className={linkClass}
                >
                  Säkerhet och ansvar
                </Link>
              </li>
              <li>
                <Link
                  to="/flyga-i-are/nodinformation"
                  className={linkClass}
                >
                  Nödinformation
                </Link>
              </li>
              <li>
                <Link
                  to="/flyga-i-are/etik-och-hansyn"
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
                <Link to="/flyga-i-are" className={linkClass}>
                  Flygguiden
                </Link>
              </li>
              <li>
                <Link to="/tavlingar" className={linkClass}>
                  Tävlingar
                </Link>
              </li>
              <li>
                <Link to="/bli-medlem" className={linkClass}>
                  Bli medlem
                </Link>
              </li>
              <li>
                <Link to="/flyga-i-are/vader" className={linkClass}>
                  Väder
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-2 flex-col gap-2">
            <h4>Om Oss</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/om" className={linkClass}>
                  Om klubben
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={linkClass}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
