import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import pluralize from 'pluralize';

import UploadAndPrintButton from './UploadAndPrintButton';
import OrderLayout from "./OrderLayout";
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import { setOrder } from './../actions/orders';
import OrderItem from './OrderItem';

class BasketPage extends React.Component {
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
    const  { order } = this.props;
    const { sub_total, tax_amount, total, number_of_items } = order;
    return (
      <OrderLayout title="Your Basket" nextButtonLink="/pick-up-location" nextButtonText="Pick up details">
        <div className="content-container">
          { this.props.orderItems.map((orderItem, index) => (
            <OrderItem key={index} orderItem={orderItem} />
          )) }
          <div className="flex justify-content--between h4">
            <div>
              <UploadAndPrintButton text="Upload More" />
            </div>
            <div className="flex flex-direction--column">
              <div className="flex justify-content--between">
                <span className="mr1">Subtotal ({number_of_items} {`${pluralize('Item', number_of_items)}`})</span>
                <span> { `$${sub_total / 100}` }</span>
              </div>
              <div className="flex justify-content--between">
                <span className="mr1">Taxes</span>
                <span>{ `$${tax_amount / 100}`}</span>
              </div>
              <div className="flex justify-content--between">
                <span>Total</span>
                <span>{ `$${total / 100}`}</span>
              </div>
            </div>
          </div>



        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
    products: state.products,
    order: state.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: (orderItems) => dispatch(setOrderItems(orderItems)),
    setProducts: (products) => dispatch(setProducts(products)),
    setOrder: (order) => dispatch(setOrder(order)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
