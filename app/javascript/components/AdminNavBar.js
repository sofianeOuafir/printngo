import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { startLogout } from "../actions/auth";
import Navbar from "./Navbar";
import SignOutLink from "./SignOutLink";
import SignInLink from "./SignInLink";

class AdminNavBar extends React.Component {
  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/admin/login");
    });
  };

  render() {
    const { auth, t } = this.props;
    const { firstname } = auth;
    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/admin/new-partner-applications">
            {t("navbar.admin.partnerApplications")}
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/admin">{firstname}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <SignOutLink onLogout={this.onLogout} />
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: <SignInLink to="/admin/login" />
      }
    ];
    return <Navbar logoRedirectTo="/admin" navBarItems={navBarItems} />;
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(AdminNavBar)));
