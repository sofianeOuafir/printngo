import React from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const BackButton = ({ history, t }) => (
  <Link
    to="#"
    onClick={e => {
      e.preventDefault();
      history.goBack();
    }}
    className="button button--navy"
  >
    &larr; {t("backButton.text")}
  </Link>
);

export default withRouter(withTranslation()(BackButton));
