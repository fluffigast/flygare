import React from "react";
import { Link } from "react-router";

const NotFoundView: React.FC = () => {
  return (
    <main>
      <section className="pt-24 pb-16 px-6 md:px-28">
        <p className="eyebrow">404</p>
        <h1 className="display mt-[-4px]">Sidan hittades inte</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          Sidan du letar efter finns inte eller har flyttats.
        </p>
        <Link to="/" className="text-sm text-accent hover:underline mt-4 inline-block">
          Till startsidan
        </Link>
      </section>
    </main>
  );
};

export default NotFoundView;
