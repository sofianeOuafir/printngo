import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import pluralize from 'pluralize';

import OrderLayout from "./OrderLayout";
import { setOrderItems } from './../actions/orderItems';
import { setProducts } from './../actions/products';
import { setOrder } from './../actions/orders';
import OrderItemList from './OrderItemList';

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
    const  { orderItems, order } = this.props;
    let { sub_total, number_of_items } = order;
    sub_total = sub_total / 100;

    return (
      <OrderLayout 
        title="Your Basket"
        nextButton={{ link: '/pick-up-location', text: 'Go to Pick up details', disabled: orderItems.length == 0 }}
        info={`Subtotal: ${number_of_items} (${pluralize('Item', number_of_items)}): $${sub_total}`}
      >
        <div className="content-container">
          <OrderItemList />
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
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
