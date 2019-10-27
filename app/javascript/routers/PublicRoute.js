import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getContext } from "./../lib/context";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const context = getContext();
  let pathname;
  if (context === "partner") {
    pathname = "/partner";
  } else {
    pathname = "/";
  }
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? <Redirect to={pathname} /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(PublicRoute);
