import React from "react";
import { withTranslation } from "react-i18next";

import PartnerApplication from "./PartnerApplication";

const PartnerApplicationList = ({ partnerApplications, t }) => {
  return partnerApplications.length > 0 ? (
    partnerApplications.map(partnerApplication => (
      <PartnerApplication
        key={partnerApplication.id}
        partnerApplication={partnerApplication}
      />
    ))
  ) : (
    <p className="h5 text-navy">
      {t("partnerApplicationList.noPartnerApplication")}
    </p>
  );
};

export default withTranslation()(PartnerApplicationList);
