import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Component {...props} />
      </div>
    ) : (
      <Redirect to={{
        pathname: "/login",
        state: {from: props.location}
    }} />
    )
  )} />
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);