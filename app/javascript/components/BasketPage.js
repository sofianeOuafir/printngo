import React from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import pluralize from 'pluralize';

import OrderLayout from "./OrderLayout";
import OrderItemList from './OrderItemList';

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
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

export default connect(mapStateToProps, null)(BasketPage);
