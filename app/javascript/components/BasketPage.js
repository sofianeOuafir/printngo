import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import pluralize from 'pluralize';

import OrderLayout from "./OrderLayout";
import OrderItemList from './OrderItemList';
import { startSetProducts } from './../actions/products';
import { startSetOrder } from './../actions/orders';
import Loader from "./Loader";

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetOrder, startSetProducts } = this.props;
    Promise.all([startSetOrder(), startSetProducts()]).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  render () {
    if(this.state.loadingData){
      return (
        <Loader />
      )
    } else {
      const  { orderItems, order } = this.props;
      let { sub_total, number_of_items } = order;
      sub_total = sub_total / 100;
      const currentState = number_of_items > 0 ? 1 : 0;
      return (
        <OrderLayout
          currentState={currentState}
          title="Your Basket"
          nextButton={{ link: '/order/pick-up-location', text: 'Go to Pick up details', disabled: orderItems.length == 0 }}
          info={`Subtotal (${number_of_items} ${pluralize('Item', number_of_items)}): $${sub_total}`}
        >
        <div className="content-container">
          <OrderItemList />
        </div>
      </OrderLayout>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => ({
  startSetProducts: () => dispatch(startSetProducts()),
  startSetOrder: () => dispatch(startSetOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
