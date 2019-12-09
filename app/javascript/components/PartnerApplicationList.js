import React from "react";

import PartnerApplication from "./PartnerApplication";

const PartnerApplicationList = ({ partnerApplications }) => {
  return partnerApplications.length > 0 ? (
    partnerApplications.map(({ company_name, id }) => (
      <PartnerApplication key={id} companyName={company_name} id={id} />
    ))
  ) : (
    <p className="h5 text-navy">There is not any partner application.</p>
  );
};

export default PartnerApplicationList;
