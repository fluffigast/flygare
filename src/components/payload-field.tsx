import React from "react";

/**
 * Wraps content with a data-payload-field attribute for click-to-edit in CMS live preview.
 * Only adds the attribute — no visual change outside the iframe.
 *
 * Usage:
 *   <PayloadField field="title"><h1>{title}</h1></PayloadField>
 *   <PayloadField field="email" as="span">{email}</PayloadField>
 */
interface PayloadFieldProps {
  field: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

const PayloadField: React.FC<PayloadFieldProps> = ({
  field,
  children,
  as: Tag = "div",
  className,
}) => {
  return (
    // @ts-expect-error — dynamic tag
    <Tag data-payload-field={field} className={className}>
      {children}
    </Tag>
  );
};

export default PayloadField;
