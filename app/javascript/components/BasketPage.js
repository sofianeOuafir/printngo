import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { connect } from 'react-redux';

import OrderLayout from "./OrderLayout";
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';

class BasketPage extends React.Component {
  componentDidMount(){
    axios.get('/api/v1/products').then((response) => {
      this.props.setProducts(response.data);
      console.log(this.props.products);
    })
    axios.get('/api/v1/orders/undefined').then((response) => {
      this.props.setOrderItems(response.data.order_items);
      console.log(this.props.orderItems);
    })
  }

  render () {
    return (
      <OrderLayout>
        <h1>Your Basket</h1>
        
        <div className="border">
        { this.props.orderItems.map((orderItem, index) => (
          <div className="border" key={index}> 
            <p>{orderItem.document.name}</p>
            <p>Print In: </p>
            <p>Quantity: {orderItem.quantity}</p>
            <p>Price: {orderItem.price / 100}</p>
          </div>
        )) }
        </div>

      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: (orderItems) => dispatch(setOrderItems(orderItems)),
    setProducts: (products) => dispatch(setProducts(products))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
