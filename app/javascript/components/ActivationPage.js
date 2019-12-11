import React from "react";
import axios from "axios";

import Loader from "./Loader";
import TextInput from "./TextInput";

class ActivationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      linkIsValid: false,
      password: "",
      passwordConfirmation: ""
    };
  }

  componentDidMount() {
    const token = this.props.match.params.token;
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

  render() {
    const {
      linkIsValid,
      loadingData,
      activation,
      password,
      passwordConfirmation
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
            <form className="checkout--form form__input-container">
              <TextInput
                className="mb1"
                type="password"
                placeholder="Password"
                value={password}
                // onChange={this.onPasswordChange}
              />
              <TextInput
                className="mb1"
                type="password"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                // onChange={this.onPasswordChange}
              />
              <button className="button button--navy fullwidth">
                Activate Now
              </button>
            </form>
          </div>
        ) : (
          <p>Not Valid</p>
        )}
      </div>
    );
  }
}

export default ActivationPage;
