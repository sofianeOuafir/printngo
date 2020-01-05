import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { fromCentsToDollars } from "./../lib/money";

const WalletElement = ({ walletBalance, t, className }) => (
  <Link to="/wallet" className="text-decoration--none">
    <span className={className}>
      {t("wallet")} (
      {walletBalance
        ? fromCentsToDollars(walletBalance)
        : fromCentsToDollars(0)}
      )
    </span>
  </Link>
);

const mapStateToProps = state => ({
  walletBalance: state.auth.wallet_balance
});

export default connect(mapStateToProps)(withTranslation()(WalletElement));
