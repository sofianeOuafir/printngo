import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { awaitingConfirmationOrders, printedOrders } from "./../lib/filters";
import { startLogout } from "../actions/auth";
import { startSetPartnerOrders } from "../actions/orders";

class PartnerNavBar extends React.Component {
  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/partner");
    });
  };

  componentDidMount() {
    const { startSetPartnerOrders } = this.props;
    startSetPartnerOrders();
  }

  render() {
    const { auth, printedOrders, awaitingConfirmationOrders } = this.props;
    const { authenticated, firstname } = auth;
    return (
      <div
        style={{ height: "75px" }}
        className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white"
      >
        <div className="content-container flex justify-content--between align-items--center fullwidth">
          <div>
            <Link className="website-name" to="/partner">
              Print N' Go
            </Link>
          </div>
          <div>
            {authenticated ? (
              <Fragment>
                <Link to="/partner">Print</Link>
                <Link to="/partner/location">My Location</Link>
                <Link to="/partner/printed-orders">
                  Printed Orders ({printedOrders.length})
                </Link>
                <Link to="/partner/awaiting-confirmation">
                  Awaiting Confirmation{" "}
                  <span className="text-orange">
                    ({awaitingConfirmationOrders.length})
                  </span>
                </Link>
                <Link to="/partner">{firstname}</Link>
                <Link to="#" onClick={this.onLogout}>
                  Log out
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/partner/login">Login</Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
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
