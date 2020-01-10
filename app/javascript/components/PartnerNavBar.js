import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { awaitingConfirmationOrders, printedOrders } from "./../lib/filters";
import { startLogout } from "../actions/auth";
import { startSetPartnerOrders } from "../actions/orders";
import Navbar from "./Navbar";
import SignOutLink from "./SignOutLink";
import SignInLink from "./SignInLink";

class PartnerNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }
  componentDidMount() {
    const { startSetPartnerOrders, auth } = this.props;
    auth.authenticated &&
      startSetPartnerOrders().then(() => {
        this.setState(() => ({ loadingData: false }));
      });
  }

  componentDidUpdate(prevProps) {
    const { startSetPartnerOrders, auth } = this.props;

    if (
      auth.authenticated &&
      auth.authenticated !== prevProps.auth.authenticated
    ) {
      startSetPartnerOrders().then(() => {
        this.setState(() => ({ loadingData: false }));
      });
    }
  }

  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/partner/login");
    });
  };

  render() {
    const { loadingData } = this.state;
    const { auth, printedOrders, awaitingConfirmationOrders, t } = this.props;
    const { firstname } = auth;
    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner">{t("navbar.partner.print")}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/partner/location">{t("navbar.partner.myLocation")}</Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/partner/printed-orders">
            {t("navbar.partner.printedOrders")} (
            {loadingData ? "-" : printedOrders.length})
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/partner/awaiting-confirmation">
            {t("navbar.partner.awaitingConfirmation")}{" "}
            <span className="text-orange">
              ({loadingData ? "-" : awaitingConfirmationOrders.length})
            </span>
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner/guide">{t("navbar.partner.guide")}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner">{firstname}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <SignOutLink onLogout={this.onLogout} />
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: <SignInLink to="/partner/login" />
      }
    ];
    return <Navbar logoRedirectTo="/partner" navBarItems={navBarItems} />;
  }
}

const mapStateToProps = ({ auth, partnerOrders }) => ({
  auth: auth,
  printedOrders: printedOrders(partnerOrders),
  awaitingConfirmationOrders: awaitingConfirmationOrders(partnerOrders)
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  startSetPartnerOrders: () => dispatch(startSetPartnerOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(PartnerNavBar)));
