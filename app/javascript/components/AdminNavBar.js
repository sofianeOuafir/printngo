import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";
import Navbar from "./Navbar";

class AdminNavBar extends React.Component {
  onLogout = () => {
    this.props.startLogout().then(() => {
      this.props.history.push("/admin/login");
    });
  };

  render() {
    const { auth } = this.props;
    const { firstname } = auth;
    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/admin">{firstname}</Link>
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
        element: <Link to="/admin/login">Login</Link>
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
)(withRouter(AdminNavBar));
