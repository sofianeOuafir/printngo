import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Component {...props} />
    )
  )} />
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(PublicRoute);