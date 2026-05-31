import React from "react";

interface PayloadFieldProps {
  field: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

const PayloadField: React.FC<PayloadFieldProps> = ({
  field,
  children,
  as = "div",
  className,
}) => {
  return React.createElement(as, { "data-payload-field": field, className }, children);
};

export default PayloadField;
