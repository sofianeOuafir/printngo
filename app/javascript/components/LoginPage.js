import React from "react"
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogin, startLogout } from './../actions/auth';

class LoginPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.startLogin({ email: 'jennaklomp@gmail.com', password: 'abc123' })
  }

  logout = () => {
    this.props.startLogout();
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text"/>
        <input type="password"/>
        <button>Login</button>
        <a onClick={this.logout}>Logout</a>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: ({ email, password }) => dispatch(startLogin({ email, password })),
  startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));
