import React from "react";

export interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: unknown;
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  ...restProps
}) => {
  return href ? (
    <a
      href={href}
      className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
