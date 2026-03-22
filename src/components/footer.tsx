import React from "react";
import { Link } from "react-router";
import Separator from "./separator";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex flex-col gap-16 max-w-2xl mx-auto px-4 w-full @container mt-16">
      <Separator />
      <footer className="mx-auto w-full">
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col gap-2">
            <h4>Flyga i Åre</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/regler"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Regler
                </Link>
              </li>
              <li>
                <Link
                  to="/riktlinjer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Riktlinjer
                </Link>
              </li>
              <li>
                <Link
                  to="/startplatser"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Startplatser
                </Link>
              </li>
              <li>
                <Link
                  to="/landningar"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Landningar
                </Link>
              </li>
              <li>
                <Link
                  to="/luftrum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Luftrum
                </Link>
              </li>
              <li>
                <Link
                  to="/nordinformation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nödinformation
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h4>Klubben</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/bli-medlem"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bli medlem
                </Link>
              </li>
              <li>
                <Link
                  to="/dokument"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dokument
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontakt
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
