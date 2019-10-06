import React from "react"
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout';
import { startLogin, startLogout } from './../actions/auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.startLogin({ email, password })
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }))
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }))
  }

  logout = () => {
    this.props.startLogout();
  }

  render () {
    return (
      <Layout>
        <div className="flex fullscreen align-items--center justify-between--center"> 
          <form onSubmit={this.onSubmit} className="border">
            <input value={this.state.email} onChange={this.onEmailChange} type="text"/>
            <input value={this.state.password} onChange={this.onPasswordChange} type="password"/>
            <button>Login</button>
            <a onClick={this.logout}>Logout</a>
          </form>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: ({ email, password }) => dispatch(startLogin({ email, password })),
  startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));
