import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";

class PartnerNavBar extends React.Component {
  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/partner");
    });
  };

  render() {
    const { auth } = this.props;
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
                <Link to="/partner/invoices">Invoices</Link>
                <Link to="/partner/location">My Location</Link>
                <Link to="/partner/printed-orders">Printed Orders</Link>
                <Link to="/partner/awaiting-confirmation">
                  Awaiting Confirmation
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

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PartnerNavBar));
