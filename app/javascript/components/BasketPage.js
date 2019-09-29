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
    const  { order, orderItems } = this.props;
    let { sub_total, tax_amount, total, number_of_items } = order;
    sub_total = sub_total / 100;
    tax_amount = tax_amount / 100;
    total = total / 100;
    return (
      <OrderLayout 
        title="Your Basket"
        nextButton={{ link: '/pick-up-location', text: 'Go to Pick up details', disabled: orderItems.length == 0 }}
        info={`Subtotal: ${number_of_items} (${pluralize('Item', number_of_items)}): $${sub_total}`}
      >
        <div className="content-container">
          { orderItems.length ? orderItems.map((orderItem, index) => (
            <OrderItem key={index} orderItem={orderItem} />
          )) : (
            <p className="h4">You basket is currently empty.</p>
          ) }
          <div className="flex justify-content--between h4">
            <div>
              <UploadAndPrintButton className="button button--navy" text="Upload Documents" />
            </div>
            <div className="flex flex-direction--column">
              <div className="flex justify-content--between">
                <span className="mr1">Subtotal ({number_of_items} {`${pluralize('Item', number_of_items)}`})</span>
                <span> { `$${sub_total}` }</span>
              </div>
              <div className="flex justify-content--between">
                <span className="mr1">Taxes</span>
                <span>{ `$${tax_amount}`}</span>
              </div>
              <div className="flex justify-content--between">
                <span>Total</span>
                <span>{ `$${total}`}</span>
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
