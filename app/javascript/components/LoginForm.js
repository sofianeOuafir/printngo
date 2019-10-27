import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TextInput from './TextInput';
import { startLogin } from './../actions/auth';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email, error: "" }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password, error: "" }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props
      .startLogin({ email, password })
      .then(() => {
        const { location, defaultRedirectTo } = this.props;
        if (location.state && location.state.from) {
          this.props.history.push(location.state.from);
        } else {
          this.props.history.push(defaultRedirectTo);
        }
      })
      .catch(e => {
        const { error } = e.response.data;
        this.setState(() => ({ error }));
      });
  };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="border border-color--grey p2 form__input-container"
      >
        <p className="text-pink center">{this.state.error}</p>
        <TextInput
          placeholder="Email"
          className="block mb1"
          value={this.state.email}
          onChange={this.onEmailChange}
          type="text"
        />
        <TextInput
          placeholder="Password"
          className="block mb1"
          value={this.state.password}
          onChange={this.onPasswordChange}
          type="password"
        />
        <button className="button button--navy fullwidth">Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: ({ email, password }) => dispatch(startLogin({ email, password }))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginForm));
