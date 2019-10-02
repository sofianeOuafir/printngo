import React from "react"
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/order/thank-you')
    console.log('yo');
  }

  render () {
    const { order } = this.props;
    const { partner } = order;
    const { name, address, city, postcode, opening_hours } = partner;
    const currentState = 3;
    return (
      <OrderLayout
        currentState={currentState}
        title="Review your order and pay">
        <div className="h5 content-container">
          <div className="p2 border mb2">
            <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
            <OrderItemList />
          </div>
          <div className="p2 border mb2">
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
          <div className="p2 border">
            <h2 className="h5 text-navy favourite-font-weight">Payment</h2>
            <div>
              <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="Firstname"/>
                <input type="text" placeholder="Lastname"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Card number"/>
                <input type="checkbox" />
                <button text="Submit">Pay Now</button>
              </form>
            </div>
          </div>
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order
})

export default connect(mapStateToProps, null)(withRouter(PaymentPage))
