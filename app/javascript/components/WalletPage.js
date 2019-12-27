import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { IoIosAddCircleOutline, IoMdPrint } from "react-icons/io";

import { fromCentsToDollars } from "./../lib/money";
import { getDateTimeFormat } from "./../lib/date";
import Loader from "./Loader";
import WalletElement from "./WalletElement";

class WalletPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loadingData: true
    };
  }

  onTransactionClick = transaction => {
    const { order, invoice } = transaction;
    if (order.print_order) {
      this.props.history.push(`/order/${order.id}`);
    } else {
      this.props.history.push(`/invoice/${invoice.id}`);
    }
  };

  componentDidMount() {
    const { authenticated } = this.props;
    if (authenticated) {
      axios.get("/api/v1/users/transactions").then(response => {
        this.setState(() => ({
          transactions: response.data,
          loadingData: false
        }));
      });
    } else {
      this.setState(() => ({ loadingData: false }));
    }
  }

  render() {
    const { loadingData, transactions } = this.state;
    const { t } = this.props;
    return loadingData ? (
      <Loader />
    ) : (
      <div className="content-container wallet-page">
        <h1>
          <WalletElement className="text-navy" />
        </h1>
        <Link to="/pricing" className="button button--pink">
          {t("callToAction.topUpNow")}
        </Link>
        {transactions.length > 0 && (
          <div className="border border-color--grey py1 mt1 px1">
            {transactions.map((transaction, index) => {
              const { order, created_at, type, new_balance } = transaction;
              const transactionContext = order.print_order ? "Print" : "Top Up";
              const amount =
                type == "Credit"
                  ? `+${fromCentsToDollars(transaction.amount)}`
                  : `-${fromCentsToDollars(transaction.amount)}`;
              return (
                <div
                  className="pointer flex justify-content--between px2 border border-color--grey mb1 py1"
                  key={index}
                  onClick={() => this.onTransactionClick(transaction)}
                >
                  <div className="flex align-items--center ">
                    <div className="mr1 text-navy h3">
                      {transactionContext == "Print" ? (
                        <IoMdPrint />
                      ) : (
                        <IoIosAddCircleOutline />
                      )}
                    </div>
                    <div className="flex flex-direction--column">
                      <span className="text-navy h5">{transactionContext}</span>
                      <span className="text-grey">
                        {getDateTimeFormat(created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-direction--column align-items--end">
                    <span
                      className={
                        type == "Credit"
                          ? "text-christmas-tree h4 transaction--amount"
                          : "text-red h4 transaction--amount"
                      }
                    >
                      {amount}
                    </span>
                    <span className="text-grey">
                      +{fromCentsToDollars(new_balance)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  walletBalance: state.auth.wallet_balance,
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(withRouter(WalletPage));
