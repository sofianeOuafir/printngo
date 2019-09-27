import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UploadAndPrintButton from './UploadAndPrintButton';
import OrderLayout from "./OrderLayout";
import { setOrderItems, removeOrderItem } from './../actions/orderItems';
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

  onRemove = (orderItemId) => {
    this.props.removeOrderItem(orderItemId);
  }

  render () {
    return (
      <OrderLayout title="Your Basket" nextButtonLink="/pick-up-location" nextButtonText="Pick up details">
        
        <div className="border">
          { this.props.orderItems.map((orderItem, index) => (
            <div className="border" key={index}> 
              <a onClick={() => { this.onRemove(orderItem.id) } }>Remove</a>
              <p>{orderItem.document.name}</p>
              <p>Print In: </p>
              <p>Quantity: {orderItem.quantity}</p>
              <p>Price: {orderItem.sub_total / 100}</p>
              <select name="" id="">
                { this.props.products.map((product, index) => (
                  <option key={index} value="">{product.name}</option>
                )) }
              </select>
            </div>
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
    setProducts: (products) => dispatch(setProducts(products)),
    removeOrderItem: (orderItemId) => dispatch(removeOrderItem(orderItemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
