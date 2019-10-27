import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getContext } from "./../lib/context";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const context = getContext();
  let pathname;
  if (context === "partner") {
    pathname = "/partner/login";
  } else {
    pathname = "/login";
  }
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
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
