import React from "react";
import { Outlet } from "react-router";
import StickySubnav from "../components/sticky-subnav";

type Props = {
  sectionPath: string;
};

/**
 * Wrappar en sektions-route så alla sub-sidor får sticky sub-nav
 * direkt under huvudheadern.
 */
const SectionLayout: React.FC<Props> = ({ sectionPath }) => (
  <>
    <StickySubnav sectionPath={sectionPath} />
    <Outlet />
  </>
);

export default SectionLayout;
