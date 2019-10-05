import React, { Fragment } from "react"
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import CheckoutForm from './CheckoutForm';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
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
            <StripeProvider apiKey="pk_test_IyiaKrZbjpSSNn0RiEni1Ry000WVCC2kWW">
              <Elements>
                <CheckoutForm />
              </Elements>
            </StripeProvider>
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
