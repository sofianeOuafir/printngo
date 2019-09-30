import React from "react"
import { connect } from 'react-redux';
import axios from 'axios';

import OrderLayout from './OrderLayout';
import OrderItemList from './OrderItemList';
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import { setOrder } from './../actions/orders';

class PaymentPage extends React.Component {
  componentDidMount(){
    axios.get('/api/v1/products').then((response) => {
      this.props.setProducts(response.data);
    })
    axios.get('/api/v1/orders/undefined').then((response) => {
      this.props.setOrderItems(response.data.order_items);
      this.props.setOrder(response.data);
    })
  }

  render () {
    return (
      <OrderLayout title="Review your order and pay">
        <div className="content-container">
          <div className="p2 border mb2">
            <h1 className="h4 text-navy">Your Order</h1>
            <OrderItemList />
          </div>
          <div className="p2 border">
            <h1 className="h4 text-navy">Pick up Location</h1>
            <span></span>
          </div>

        </div>
      </OrderLayout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: (orderItems) => dispatch(setOrderItems(orderItems)),
    setProducts: (products) => dispatch(setProducts(products)),
    setOrder: (order) => dispatch(setOrder(order)),
  }
}

export default connect(null, mapDispatchToProps)(PaymentPage)
