import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PageBanner from "./PageBanner";
import PartnerApplicationForm from "./PartnerApplicationForm";
import images from "./../images";

class PartnerApplicationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: false
    };
  }

  onSubmit = partnerApplication => {
    return axios
      .post("/api/v1/partner_applications", partnerApplication)
      .then(() => {
        this.setState(() => ({ applied: true }));
      });
  };

  render() {
    const { applied } = this.state;
    const { t } = this.props;
    return (
      <div className="content-container pb3 mb3">
        <PageBanner
          title={t("partnerApplicationPage.title")}
          description={t("partnerApplicationPage.description")}
        />
        {applied ? (
          <div className="partner-application-page--thank-you content-container border border-color--grey h5 flex justify-content--center">
            <div className="my2">
              <div className="center">
                <img src={images.success} alt="Success Icon" width={100} />
              </div>
              <h1 className="h4 center">
                {t("partnerApplicationPage.success")}
              </h1>
              <div>
                <p className="center">{t("partnerApplicationPage.thankYou")}</p>
              </div>
              <div className="flex justify-content--center">
                <Link
                  className="mt3 button button--pink"
                  to={`/become-partner`}
                >
                  {t("partnerApplicationPage.finish")}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="border border-color--grey p1">
              <PartnerApplicationForm
                showAdminFields={false}
                onSubmit={this.onSubmit}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PartnerApplicationPage;
