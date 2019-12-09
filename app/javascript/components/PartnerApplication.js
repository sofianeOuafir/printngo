import React from "react";
import { Link } from "react-router-dom";

const PartnerApplication = ({ companyName, id }) => (
  <div className="flex justify-content--between mb1 align-items--center p1 border border-color--grey">
    <span className="text-navy h5">{companyName}</span>
    <Link
      to={`/admin/partner-application/${id}`}
      className="button button--navy"
    >
      View
    </Link>
  </div>
);

export default PartnerApplication;
