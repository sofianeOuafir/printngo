import React, {Component, Fragment} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import images from './../images';
import { startSignUp } from './../actions/auth';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: 'Sofiane',
      lastname: 'Ouafir',
      email: 'sooooo@live.fr',
      password: 'abc123',
      passwordConfirmation: 'abc123',
      cardComplete: false,
      errors: {
        firstname: [],
        lastname: [],
        email: [],
        password: [],
        payment: ''
      }
    }
  }

  onFirstnameChange = (e) => {
    const firstname = e.target.value;
    this.setState(() => ({ firstname }))
  }

  onLastnameChange = (e) => {
    const lastname = e.target.value;
    this.setState(() => ({ lastname }))
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }))
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }))
  }

  onPasswordConfirmationChange = (e) => {
    const passwordConfirmation = e.target.value;
    this.setState(() => ({ passwordConfirmation }))
  }

  onCardChange = (e) => {
    this.setState(() => ({ cardComplete: e.complete }))
    // console.log(e.complete);
  }

  attemptPayment = () => {
    const { auth, stripe, history } = this.props;
    const { fullname, id } = auth;
    const { cardComplete } = this.state;

    if(cardComplete) {
      stripe.createToken({name: `${fullname}, id: ${id}`}).then((response) => {
        let {token} = response;
        axios.post("/api/v1/payments", {
          token: token.id
        }).then((response) => {
          console.log("Purchase Complete!")
          history.push('/order/thank-you');
          console.log(response);
        }).catch((e) => {
          this.setState((prevState) => ({ errors: { ...prevState.errors, payment: e.response.data } }))
        })
      })
    } else {
      this.setState((prevState) => ({ errors: { ...prevState.errors, payment: 'Please provide card details' } }))
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { auth, startSignUp } = this.props;
    const { authenticated } = auth;
    const { firstname, lastname, email, password } = this.state;

    if(authenticated) {
      this.attemptPayment();
    } else {
      const user = { firstname, lastname, email, password }
      startSignUp(user).then((response) => {
        this.attemptPayment();
      }).catch((e) => {
        const errors = JSON.parse(e.response.data.errors);
        const { email, firstname, lastname, password } = errors;
        this.setState((prevState) => ({ errors: { ...prevState.errors, email, firstname, lastname, password } }));
        console.log(errors);
      })
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <form className="form__input-container" onSubmit={this.onSubmit}>
        { 
          !auth.authenticated && (
            <Fragment>
              <div className="flex">
                <input required className="mr1" type="text" placeholder="Firstname" value={this.state.firstname} onChange={this.onFirstnameChange} />
                <input required type="text" placeholder="Lastname" value={this.state.lastname} onChange={this.onLastnameChange} />
              </div>
              <div className="flex flex-direction--column mt2">
                <input required type="text" placeholder="Email" value={this.state.email} onChange={this.onEmailChange}/>
                <div>
                  { this.state.errors.email.map((error, index) => (
                    <p key={index}>{error}</p>
                  )) }
                </div>
              </div>
              <div className="flex mt2">
                <input required className="mr1" type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/>
                <input required type="password" placeholder="Password Confirmation" value={this.state.passwordConfirmation} onChange={this.onPasswordConfirmationChange}/>
              </div>
              <div className="mt2">
                <span>Already customer? <Link to="/login">Sign In</Link></span>
              </div>
            </Fragment>
          )
        }
        <div className="mt2">
          <img className="mr1" src={images.mastercard} alt="MasterCard Icon" width={50}/>
          <img src={images.visa} alt="MasterCard Icon" width={50}/>
        </div>
        <CardElement hidePostalCode={true} onChange={this.onCardChange} />
        <p>{this.state.errors.payment}</p>
        <div className="my2">
          <label>
            <input type="checkbox" />
            I agree to terms and conditions. I have double checked my document preview and specification. I understand that my order will be printed in line with the preview and specification I have chosen.
          </label>
        </div>
        <button className="fullwidth button button--pink" text="Submit">Pay Now</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startSignUp: (user) => dispatch(startSignUp(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(withRouter(CheckoutForm)));