import React from "react";
import { Link } from "react-router";

const NotFoundView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Sidan hittades inte</h1>
      <p className="text-muted-foreground">
        Sidan du letar efter finns inte eller har flyttats.
      </p>
      <Link to="/" className="text-primary hover:underline">
        Till startsidan
      </Link>
    </div>
  );
};

export default NotFoundView;
