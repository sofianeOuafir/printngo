import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Loader from "./Loader";
import TextInput from "./TextInput";

class ActivationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      linkIsValid: false,
      password: "",
      passwordConfirmation: "",
      token: props.match.params.token,
      errors: {
        password: [],
        passwordConfirmation: []
      }
    };
  }

  componentDidMount() {
    const { token } = this.state;
    axios
      .get(`/api/v1/partners/activations/${token}`)
      .then(response => {
        this.setState(() => ({
          linkIsValid: true,
          activation: response.data,
          loadingData: false
        }));
      })
      .catch(() => {
        this.setState(() => ({ linkIsValid: false, loadingData: false }));
      });
  }

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onPasswordConfirmationChange = e => {
    const passwordConfirmation = e.target.value;
    this.setState(() => ({ passwordConfirmation }));
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      password,
      passwordConfirmation: password_confirmation,
      token
    } = this.state;
    axios
      .patch(`/api/v1/partners/activations/${token}`, {
        password,
        password_confirmation,
        activated: true
      })
      .then(response => {
        this.props.history.push("/partner/login");
      })
      .catch(e => {
        const errors = JSON.parse(e.response.data.errors);
        const { password, password_confirmation } = errors;
        this.setState(() => ({
          errors: {
            password,
            passwordConfirmation: password_confirmation
          }
        }));
      });
  };

  render() {
    const {
      linkIsValid,
      loadingData,
      activation,
      password,
      passwordConfirmation,
      errors
    } = this.state;
    return loadingData ? (
      <Loader />
    ) : (
      <div className="flex fullscreen align-items--center justify-content--center">
        {linkIsValid ? (
          <div className="halfwidth p2 border border-color--grey">
            <h1 className="center text-navy">
              Welcome, {activation.partner.firstname}!
            </h1>
            <p className="text-navy h4 center">
              Setup a new password to activate your account
            </p>
            <form
              className="checkout--form form__input-container"
              onSubmit={this.onSubmit}
            >
              <TextInput
                errors={errors.password}
                className="mb1"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.onPasswordChange}
              />
              <TextInput
                errors={errors.passwordConfirmation}
                className="mb1"
                type="password"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={this.onPasswordConfirmationChange}
              />
              <button className="button button--navy fullwidth">
                Activate Now
              </button>
            </form>
          </div>
        ) : (
          <p className="h4 text-navy">
            This activation link is not valid anymore. Please{" "}
            <a href="mailto:contact@printngo.ca">contact us</a>.
          </p>
        )}
      </div>
    );
  }
}

export default withRouter(ActivationPage);
