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
    return (
      <div className="content-container pb3 mb3">
        <PageBanner
          title="Become a Print n' Go Partner"
          description="Want to attract more customers in your shop while making money off your printing machine? Your are in the right place! Simply fill up the form and we will get back to you as soon as possible. "
        />
        {applied ? (
          <div className="partner-application-page--thank-you content-container border border-color--grey h5 flex justify-content--center">
            <div className="my2">
              <div className="center">
                <img src={images.success} alt="Success Icon" width={100} />
              </div>
              <h1 className="h4 center">Success!</h1>
              <div>
                <p className="center">
                  Thank you for completing the form! We will get back to you
                  shortly!
                </p>
              </div>
              <div className="flex justify-content--center">
                <Link
                  className="mt3 button button--pink"
                  to={`/become-partner`}
                >
                  Finish
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
