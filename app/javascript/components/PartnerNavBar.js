import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { awaitingConfirmationOrders, printedOrders } from "./../lib/filters";
import { startLogout } from "../actions/auth";
import { startSetPartnerOrders } from "../actions/orders";
import Navbar from "./Navbar";

class PartnerNavBar extends React.Component {
  componentDidMount() {
    const { startSetPartnerOrders } = this.props;
    startSetPartnerOrders();
  }

  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/partner/login");
    });
  };

  render() {
    const { auth, printedOrders, awaitingConfirmationOrders } = this.props;
    const { firstname } = auth;
    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner">Print</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner/location">My Location</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/partner/printed-orders">
            Printed Orders ({printedOrders.length})
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/partner/awaiting-confirmation">
            Awaiting Confirmation{" "}
            <span className="text-orange">
              ({awaitingConfirmationOrders.length})
            </span>
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner">{firstname}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/partner/test-printing">Test Printing</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="#" onClick={this.onLogout}>
            Log out
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: <Link to="/partner/login">Login</Link>
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
)(withRouter(PartnerNavBar));
