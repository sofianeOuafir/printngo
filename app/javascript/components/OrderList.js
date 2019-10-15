import React from 'react';
import { connect } from 'react-redux';

import Order from './Order';
const OrderList = ({ clientOrders }) => {
  return (
    clientOrders.length ? (
      clientOrders.map((order, index) => {
        return (
          <Order order={order} key={index} />
      )})
    ) : (
      <p className="h5">You don't have any order yet.</p>
    )
  )
}

const mapStateToProps = ({ clientOrders }) => ({
  clientOrders
});

export default connect(mapStateToProps)(OrderList)