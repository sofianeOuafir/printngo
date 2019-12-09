import React from "react";
import SubNavBar from "./SubNavBar";

const PartnerApplicationSubNavBar = () => (
  <SubNavBar
    links={[
      { url: "/admin/new-partner-applications", text: "New Applications" },
      { url: "/admin/archived-partner-applications", text: "Archived Applications" }
    ]}
  />
);

export default PartnerApplicationSubNavBar;
