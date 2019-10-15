import React from "react"

import { fromCentsToDollars } from './../utils/money';
import { getDateTimeFormat } from './../utils/date';

const Order = ({ order }) => {
  const { total, id, payment, printed } = order
  return (
    <div className="h5 border border-color--grey flex justify-content--between p1 mb1 center">
      <div className="flex flex-direction--column">
        <span className="mb1">Order placed</span>
        <span>{getDateTimeFormat(payment.created_at)}</span>
      </div>
      <div className="flex flex-direction--column">
        <span className="mb1">Total</span>
        <span>{fromCentsToDollars(total)}</span>
      </div>
      <div className="flex flex-direction--column">
        <span className="mb1">Status</span>
        <span>{printed ? 'Completed' : 'Ready to Print'}</span>
      </div>
      <div className="flex flex-direction--column">
        <span className="mb1">Order #{id}</span>
        <div>
          <span className="mr1">Order details</span>
          <span>Invoice</span>
        </div>
      </div>
    </div>
  );
}

export default Order
