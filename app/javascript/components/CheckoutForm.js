import React, { Component, Fragment } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import images from "./../images";
import { startSignUp } from "./../actions/auth";
import {
  startCreatePrintOrderPayment,
  startCreateTopUpOrderPayment
} from "./../actions/payments";
import TextInput from "./TextInput";
import SignInLink from "./SignInLink";
import { PRINT_ORDER, TOP_UP_ORDER } from "./../constants/constants";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      cardComplete: false,
      errors: {
        firstname: [],
        lastname: [],
        email: [],
        password: [],
        passwordConfirmation: [],
        payment: "",
        termsAndCondition: ""
      },
      agreedToTermsAndConditions:
        props.clientCurrentOrder.agreed_to_terms_and_conditions || false,
      processingPayment: false
    };
  }

  onTermsAndConditionsAgreementChange = e => {
    this.setState(prevState => ({
      errors: { ...prevState.errors, termsAndCondition: "" }
    }));
    const value = e.target.checked;

    this.setState(() => ({ agreedToTermsAndConditions: value }));
  };

  onFirstnameChange = e => {
    const firstname = e.target.value;
    this.setState(prevState => ({
      firstname,
      errors: { ...prevState.errors, firstname: [] }
    }));
  };

  onLastnameChange = e => {
    const lastname = e.target.value;
    this.setState(prevState => ({
      lastname,
      errors: { ...prevState.errors, lastname: [] }
    }));
  };

  onEmailChange = e => {
    let email = e.target.value;
    if (email) {
      email = email.toLowerCase();
    }
    this.setState(prevState => ({
      email,
      errors: { ...prevState.errors, email: [] }
    }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(prevState => ({
      password,
      errors: { ...prevState.errors, password: [] }
    }));
  };

  onPasswordConfirmationChange = e => {
    const passwordConfirmation = e.target.value;
    this.setState(prevState => ({
      passwordConfirmation,
      errors: { ...prevState.errors, passwordConfirmation: [] }
    }));
  };

  onCardChange = e => {
    this.setState(prevState => ({
      cardComplete: e.complete,
      errors: { ...prevState.errors, payment: "" }
    }));
  };

  attemptPayment = () => {
    const { auth, stripe, t } = this.props;
    const { fullname, id } = auth;
    const { cardComplete } = this.state;
    if (!this.state.agreedToTermsAndConditions) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          termsAndCondition: t("checkoutForm.pleaseAgreeToTandC")
        },
        processingPayment: false
      }));
      return;
    }
    if (!this.isStripePayment() || cardComplete) {
      if (this.isStripePayment()) {
        stripe
          .createToken({ name: `${fullname}, id: ${id}` })
          .then(response => {
            let { token } = response;
            this.makePayment(token.id);
          });
      } else {
        this.makePayment();
      }
    } else {
      this.setState(prevState => ({
        errors: { ...prevState.errors, payment: "Please provide card details" },
        processingPayment: false
      }));
    }
  };

  makePayment = (tokenId = null) => {
    const { history, startCreatePayment, orderType } = this.props;
    startCreatePayment(tokenId)
      .then(response => {
        const { order } = response.data;
        const redirectUrlAfterSuccess =
          orderType === PRINT_ORDER
            ? `/order/${order.id}/thank-you`
            : `/top-up-order/${order.id}/thank-you`;
        history.push(redirectUrlAfterSuccess);
        this.setState(() => ({ processingPayment: false }));
      })
      .catch(e => {
        this.setState(prevState => ({
          errors: { ...prevState.errors, payment: e.response.data },
          processingPayment: false
        }));
      });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState(
      () => ({ processingPayment: true }),
      () => {
        const { auth, startSignUp } = this.props;
        const { authenticated } = auth;
        const {
          firstname,
          lastname,
          email,
          password,
          passwordConfirmation: password_confirmation
        } = this.state;

        if (authenticated) {
          this.attemptPayment();
        } else {
          const user = {
            firstname,
            lastname,
            email,
            password,
            password_confirmation
          };
          startSignUp(user)
            .then(() => {
              this.attemptPayment();
            })
            .catch(e => {
              const errors = JSON.parse(e.response.data.errors);
              const {
                email,
                firstname,
                lastname,
                password,
                password_confirmation
              } = errors;
              this.setState(prevState => ({
                errors: {
                  ...prevState.errors,
                  email,
                  firstname,
                  lastname,
                  password,
                  passwordConfirmation: password_confirmation
                },
                processingPayment: false
              }));
            });
        }
      }
    );
  };

  isStripePayment = () => {
    const { clientCurrentOrder, auth, orderType } = this.props;
    return (
      orderType === TOP_UP_ORDER ||
      !auth.authenticated ||
      auth.wallet_balance < clientCurrentOrder.total
    );
  };

  render() {
    const { auth, orderType, t } = this.props;
    const {
      errors,
      firstname,
      lastname,
      email,
      password,
      passwordConfirmation,
      agreedToTermsAndConditions,
      processingPayment
    } = this.state;
    return (
      <form
        className="checkout--form form__input-container"
        onSubmit={this.onSubmit}
      >
        {!auth.authenticated && (
          <Fragment>
            <div className="checkout-form--input-container">
              <div className="col-6 mr1">
                <TextInput
                  errors={errors.firstname}
                  className="mb1"
                  type="text"
                  placeholder={t("checkoutForm.firstname")}
                  value={firstname}
                  onChange={this.onFirstnameChange}
                />
              </div>
              <div className="col-6">
                <TextInput
                  errors={errors.lastname}
                  className="mb1"
                  type="text"
                  placeholder={t("checkoutForm.lastname")}
                  value={lastname}
                  onChange={this.onLastnameChange}
                />
              </div>
            </div>

            <div>
              <TextInput
                errors={errors.email}
                type="text"
                className="mb1"
                placeholder={t("checkoutForm.email")}
                value={email}
                onChange={this.onEmailChange}
              />
            </div>
            <div className="flex checkout-form--input-container">
              <div className="col-6 mr1">
                <TextInput
                  errors={errors.password}
                  className="mb1"
                  type="password"
                  placeholder={t("checkoutForm.password")}
                  value={password}
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="col-6">
                <TextInput
                  errors={errors.passwordConfirmation}
                  className="mb1"
                  type="password"
                  placeholder={t("checkoutForm.passwordConfirmation")}
                  value={passwordConfirmation}
                  onChange={this.onPasswordConfirmationChange}
                />
              </div>
            </div>
            <div className="mt2">
              <span>
                {t("checkoutForm.alreadyCustomer")} <SignInLink to="/login" />
              </span>
            </div>
          </Fragment>
        )}
        <div className="mt2">
          <img
            className="mr1"
            src={images.mastercard}
            alt="MasterCard Icon"
            width={50}
          />
          <img src={images.visa} alt="MasterCard Icon" width={50} />
        </div>
        {this.isStripePayment() && (
          <CardElement hidePostalCode={true} onChange={this.onCardChange} />
        )}
        <p className="text-pink">{errors.payment}</p>
        <div className="my2">
          <label>
            <input
              type="checkbox"
              checked={agreedToTermsAndConditions}
              onChange={this.onTermsAndConditionsAgreementChange}
            />
            {t("checkoutForm.agreeTermsAndConditions")}{" "}
            {orderType === PRINT_ORDER && t("checkoutForm.doubleCheck")}
          </label>
          {errors.termsAndCondition && (
            <p className="text-pink">{errors.termsAndCondition}</p>
          )}
        </div>
        <button
          disabled={processingPayment}
          className={`fullwidth button ${
            processingPayment ? "button-grey text-pink" : "button--pink"
          }`}
          text="Submit"
        >
          {processingPayment
            ? t("checkoutForm.processingPayment")
            : t("checkoutForm.payNow")}
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  clientCurrentOrder: state.clientCurrentOrder
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startSignUp: user => dispatch(startSignUp(user)),
    startCreatePayment:
      ownProps.orderType === TOP_UP_ORDER
        ? (token, productId = ownProps.productId) =>
            dispatch(startCreateTopUpOrderPayment({ token, productId }))
        : token => dispatch(startCreatePrintOrderPayment(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(withRouter(withTranslation()(CheckoutForm))));
