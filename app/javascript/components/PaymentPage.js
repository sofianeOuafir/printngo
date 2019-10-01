import React from "react"
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import { setOrder } from './../actions/orders';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPage: false
    }
  }

  componentDidMount() {
    Promise.all([axios.get('/api/v1/products'), axios.get('/api/v1/orders/undefined')]).then(([responseProducts, responseOrder]) => {
      this.props.setProducts(responseProducts.data)
      this.props.setOrder(responseOrder.data);
      this.props.setOrderItems(responseOrder.data.order_items);
      console.log(responseProducts, responseOrder);
      this.setState(() => ({renderPage: true}) )
    })
  }

  render () {
    const { renderPage } = this.state;
    const { order } = this.props;
    const { partner } = order;
    const { name, address, city, postcode, opening_hours } = partner;
    return (
      <OrderLayout 
        renderPage={renderPage} 
        title="Review your order and pay">
        <div className="content-container">
          <div className="p2 border mb2">
            <h1 className="h4 text-navy">Your Order</h1>
            <OrderItemList />
          </div>
          <div className="p2 border">
            <h1 className="h4 text-navy">Pick up Location</h1>
            <div className="flex h4 mb1">
              <div className="flex flex-direction--column">
                <span>{partner.name}</span>
                <span>{partner.address}</span>
                <span>{partner.city}</span>
                <span>{partner.postcode}</span>
              </div>
              <span>{partner.opening_hours}</span>
            </div>
            <Link to="/pick-up-location" className="button button-outline button-outline--pink">Select Another Pick up Location</Link>
          </div>
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order
})

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: (orderItems) => dispatch(setOrderItems(orderItems)),
    setProducts: (products) => dispatch(setProducts(products)),
    setOrder: (order) => dispatch(setOrder(order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
