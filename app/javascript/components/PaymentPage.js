import React, { Fragment } from "react"
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import images from './../images';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firtname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/order/thank-you')
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

  render () {
    const { order, auth } = this.props;
    const { partner } = order;
    const { name, address, city, postcode, opening_hours } = partner;
    const currentState = 3;
    return (
      <OrderLayout
        stickyBar={false}
        currentState={currentState}
        title="Review your order and pay">
        <div className="h5 content-container">
          <div className="p2 border border-color--grey mb2">
            <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
            <OrderItemList />
          </div>
          <div className="p2 border border-color--grey mb2">
            <h2 className="h5 text-navy favourite-font-weight">Pick up Location</h2>
            <div className="flex mb1">
              <div className="flex flex-direction--column">
                <span>{name}</span>
                <span>{address}</span>
                <span>{city}</span>
                <span>{postcode}</span>
              </div>
              <span>{opening_hours}</span>
            </div>
            <Link to="/order/pick-up-location" className="button button-outline button-outline--pink">&larr; Select Another Pick up Location</Link>
          </div>
          <div className="p2 border border-color--grey">
            <h2 className="h5 text-navy favourite-font-weight">Payment</h2>
            <form className="form__input-container" onSubmit={this.onSubmit}>
              {
                !auth.authenticated && (
                  <Fragment>
                    <div className="flex">
                      <input className="mr1" type="text" placeholder="Firstname" value={this.state.firstname} onChange={this.onFirstnameChange} />
                      <input type="text" placeholder="Lastname" value={this.state.lastname} onChange={this.onLastnameChange} />
                    </div>
                    <div className="flex mt2">
                      <input type="text" placeholder="Email" value={this.state.email} onChange={this.onEmailChange}/>
                    </div>
                    <div className="flex mt2">
                      <input className="mr1" type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange}/>
                      <input type="password" placeholder="Password Confirmation" value={this.state.passwordConfirmation} onChange={this.onPasswordConfirmationChange}/>
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
              <div className="flex mt2">
                <input type="text" placeholder="Card number"/>
              </div>
              <div className="my2">
                <label>
                  <input type="checkbox" />
                  I agree to terms and conditions. I have double checked my document preview and specification. I understand that my order will be printed in line with the preview and specification I have chosen.
                </label>
              </div>
              <button className="fullwidth button button--pink" text="Submit">Pay Now</button>
            </form>
          </div>
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth
})

export default connect(mapStateToProps, null)(withRouter(PaymentPage))
