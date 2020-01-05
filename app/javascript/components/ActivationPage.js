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
      .then(() => {
        this.props.history.push("/partner/activation/thank-you");
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
    const { t } = this.props;
    return loadingData ? (
      <Loader />
    ) : (
      <div className="flex fullscreen align-items--center justify-content--center">
        {linkIsValid ? (
          <div className="halfwidth p2 border border-color--grey">
            <h1 className="center text-navy">
              {t("activationPage.welcome")}, {activation.partner.firstname}!
            </h1>
            <p className="text-navy h4 center">
              {t("activationPage.setupNewPassword")}
            </p>
            <form
              className="checkout--form form__input-container"
              onSubmit={this.onSubmit}
            >
              <TextInput
                errors={errors.password}
                style={{ marginBottom: '5px' }}
                type="password"
                placeholder={t("activationPage.password")}
                value={password}
                onChange={this.onPasswordChange}
              />
              <TextInput
                errors={errors.passwordConfirmation}
                style={{ marginBottom: '5px' }}
                type="password"
                placeholder={t("activationPage.passwordConfirmation")}
                value={passwordConfirmation}
                onChange={this.onPasswordConfirmationChange}
              />
              <button className="button button--navy fullwidth">
                {t("activationPage.activateNow")}
              </button>
            </form>
          </div>
        ) : (
          <p className="h4 text-navy">{t("activationPage.linkInvalid")}</p>
        )}
      </div>
    );
  }
}

export default withRouter(ActivationPage);
