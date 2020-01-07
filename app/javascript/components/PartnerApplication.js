import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { withTranslation } from "react-i18next";

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

const PartnerApplication = ({ partnerApplication, history, t }) => {
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
          {t("partnerApplication.view")}
        </Link>
        {!partnerCreated && (
          <Link
            className="button button--leaf"
            to="#"
            onClick={e => onCreatePartnerClick({ id, history, e })}
          >
            {t("partnerApplication.createAccount")}
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(withTranslation()(PartnerApplication));
