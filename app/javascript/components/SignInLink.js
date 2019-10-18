import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const SignInLink = (props) => (
  <Link to={{
    pathname: "/login",
    state: {from: props.location}
  }}>
    Sign In
  </Link>
)

export default withRouter(SignInLink);