import React from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const SignInLink = ({ location, t, to }) => (
  <Link
    to={{
      pathname: to,
      state: { from: location }
    }}
  >
    {t("signInLink")}
  </Link>
);

export default withRouter(withTranslation()(SignInLink));
