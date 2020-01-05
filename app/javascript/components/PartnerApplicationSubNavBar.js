import React from "react";
import SubNavBar from "./SubNavBar";
import { withTranslation } from "react-i18next";

const PartnerApplicationSubNavBar = ({ t }) => (
  <SubNavBar
    links={[
      {
        url: "/admin/new-partner-applications",
        text: t("partnerApplicationSubNavBar.newApplications")
      },
      {
        url: "/admin/archived-partner-applications",
        text: t("partnerApplicationSubNavBar.archivedApplications")
      }
    ]}
  />
);

export default withTranslation()(PartnerApplicationSubNavBar);
