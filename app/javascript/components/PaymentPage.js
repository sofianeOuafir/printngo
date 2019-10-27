import React from "react"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import CheckoutForm from './CheckoutForm';
import { startSetClientCurrentOrder } from './../actions/orders';
import { startSetProducts } from './../actions/products';
import Loader from "./Loader";
import Partner from './Partner';
import { Link } from 'react-router-dom';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetClientCurrentOrder, startSetProducts } = this.props;
    Promise.all([startSetProducts(), startSetClientCurrentOrder()]).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }
  
  render () {
    if(this.state.loadingData) {
      return (
        <Loader />
      )
    } else {
      const { clientCurrentOrder, orderItems } = this.props;
      const { partner } = clientCurrentOrder;
      const currentState = 3;
      return (
        <OrderLayout
          stickyBar={false}
          currentState={currentState}
          title="Review your order and pay">
          <div className="h5 content-container">
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">Pick up Location</h2>
              <Partner partner={partner} order={clientCurrentOrder} ></Partner>
              <div className="mt1">
                <Link to="/order/pick-up-location" className="button button-outline button-outline--pink">&larr; Select Another Pick up Location</Link>
              </div>
            </div>
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
              <OrderItemList orderItems={orderItems} order={clientCurrentOrder} />
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
  clientCurrentOrder: state.clientCurrentOrder,
  orderItems: state.orderItems
})

const mapDispatchToProps = (dispatch) => ({
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder()),
  startSetProducts: () => dispatch(startSetProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PaymentPage))
