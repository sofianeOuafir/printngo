import React from "react"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import CheckoutForm from './CheckoutForm';
import { startSetOrder } from './../actions/orders';
import { startSetProducts } from './../actions/products';
import Loader from "./Loader";
import PickUpLocationCard from './PickUpLocationCard';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetOrder, startSetProducts } = this.props;
    Promise.all([startSetProducts(), startSetOrder()]).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }
  
  render () {
    if(this.state.loadingData) {
      return (
        <Loader />
      )
    } else {
      const { order, orderItems } = this.props;
      const { partner } = order;
      const currentState = 3;
      return (
        <OrderLayout
          stickyBar={false}
          currentState={currentState}
          title="Review your order and pay">
          <div className="h5 content-container">
            <PickUpLocationCard partner={partner} />
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
              <OrderItemList orderItems={orderItems} order={order} />
            </div>
            <div className="p2 border border-color--grey">
              <h2 className="h5 text-navy favourite-font-weight">Payment</h2>
              <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
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
}

const mapStateToProps = (state) => ({
  order: state.order,
  orderItems: state.orderItems
})

const mapDispatchToProps = (dispatch) => ({
  startSetOrder: () => dispatch(startSetOrder()),
  startSetProducts: () => dispatch(startSetProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentPage))
