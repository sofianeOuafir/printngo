import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import images from "./../images";

const ActivationThankYouPage = ({ t }) => {
  return (
    <div className="mx1 mt1 content-container border border-color--grey h5 flex justify-content--center">
      <div className="my2">
        <div className="center">
          <img src={images.success} alt="Success Icon" width={80} />
        </div>
        <p className="h4 center thank-you-page--title">
          {t("activationThankYouPage.accountActivated")}
        </p>
        <Link
          className="button button--navy fullwidth px0"
          to={`/partner/login`}
        >
          {t("activationThankYouPage.loginNow")}
        </Link>
      </div>
    </div>
  );
};

export default withTranslation()(ActivationThankYouPage);
