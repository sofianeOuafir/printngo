import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

const onCreatePartnerClick = ({ e, id, history }) => {
  e.preventDefault();
  axios
    .post("/api/v1/admins/partners", {
      partner_application_id: id
    })
    .then(() => {
      history.push("/admin/new-partner-applications");
    });
};

const PartnerApplication = ({ partnerApplication, history }) => {
  const {
    company_name: companyName,
    id,
    partner_created: partnerCreated
  } = partnerApplication;

  return (
    <div className="flex justify-content--between mb1 align-items--center p1 border border-color--grey">
      <span className="text-navy h5">{companyName}</span>
      <div className="flex flex-direction--column">
        <Link
          to={`/admin/partner-application/${id}`}
          className="button button--navy"
          style={{ marginRight: "5px", marginBottom: "5px" }}
        >
          View
        </Link>
        {!partnerCreated && (
          <Link
            className="button button--pink"
            to="#"
            onClick={e => onCreatePartnerClick({ id, history, e })}
          >
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(PartnerApplication);
