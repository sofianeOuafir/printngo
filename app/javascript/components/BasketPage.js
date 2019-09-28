import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';

import UploadAndPrintButton from './UploadAndPrintButton';
import OrderLayout from "./OrderLayout";
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import OrderItem from './OrderItem';

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
      <OrderLayout title="Your Basket" nextButtonLink="/pick-up-location" nextButtonText="Pick up details">
        <div className="content-container">
          { this.props.orderItems.map((orderItem, index) => (
            <OrderItem key={index} orderItem={orderItem} />
          )) }
          <UploadAndPrintButton text="Upload More" />
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
