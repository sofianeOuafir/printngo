import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getContext } from "./../lib/context";

export const PrivateRoute = ({
  isAuthenticated = true,
  component: Component,
  ...rest
}) => {
  const context = getContext();
  let pathname;
  if (context === "partner") {
    pathname = "/partner/login";
  } else if (context === "admin") {
    pathname = "/admin/login";
  } else {
    pathname = "/login";
  }

  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
