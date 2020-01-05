import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SignOutLink = ({ t, onLogout }) => (
  <Link to="#" onClick={onLogout}>
    {t("signOutLink")}
  </Link>
);

export default withTranslation()(SignOutLink);
