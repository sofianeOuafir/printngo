import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import pluralize from 'pluralize';

import OrderLayout from "./OrderLayout";
import OrderItemList from './OrderItemList';
import { startSetProducts } from './../actions/products';
import { startSetClientCurrentOrder } from './../actions/orders';
import Loader from "./Loader";
import { fromCentsToDollars } from '../lib/money';

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetClientCurrentOrder, startSetProducts } = this.props;
    Promise.all([startSetClientCurrentOrder(), startSetProducts()]).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  render () {
    if(this.state.loadingData){
      return (
        <Loader />
      )
    } else {
      const  { orderItems, clientCurrentOrder } = this.props;
      let { sub_total, number_of_items } = clientCurrentOrder;
      sub_total = fromCentsToDollars(sub_total);
      const currentState = number_of_items > 0 ? 1 : 0;
      return (
        <OrderLayout
          currentState={currentState}
          title="Your Basket"
          nextButton={{ link: '/order/pick-up-location', text: 'Go to Pick up details', disabled: orderItems.length == 0 }}
          info={`Subtotal (${number_of_items} ${pluralize('Item', number_of_items)}): ${sub_total}`}
        >
        <div className="content-container">
          <OrderItemList orderItems={orderItems} order={clientCurrentOrder} />
        </div>
      </OrderLayout>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
    clientCurrentOrder: state.clientCurrentOrder
  }
}

const mapDispatchToProps = dispatch => ({
  startSetProducts: () => dispatch(startSetProducts()),
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
