import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fromCentsToDollars } from "./../lib/money";

const WalletElement = ({ walletBalance }) => (
  <Link to="/wallet">
    <span className="text-pink">
      Wallet (
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

export default connect(mapStateToProps)(WalletElement);
