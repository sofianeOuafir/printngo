import React from "react";

import PartnerApplication from "./PartnerApplication";

const PartnerApplicationList = ({ partnerApplications }) => {
  return partnerApplications.length > 0 ? (
    partnerApplications.map(partnerApplication => (
      <PartnerApplication
        key={partnerApplication.id}
        partnerApplication={partnerApplication}
      />
    ))
  ) : (
    <p className="h5 text-navy">There is not any partner application.</p>
  );
};

export default PartnerApplicationList;
