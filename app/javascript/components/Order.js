import React from "react";
import { Link } from "react-router-dom";

import { fromCentsToDollars } from "../lib/money";
import { getDateTimeFormat } from "../lib/date";
import OrderStatus from "./OrderStatus";

const Order = ({ order }) => {
  const { total, id, payment, invoice } = order;
  const invoiceId = invoice ? invoice.id : null;
  return (
    <div className="h5 border border-color--grey flex justify-content--between p1 mb1 center">
      <div className="flex flex-direction--column">
        <span className="mb1">Status</span>
        <OrderStatus order={order} />
      </div>
      <div className="flex flex-direction--column">
        <span className="mb1">Order placed</span>
        <span>{getDateTimeFormat(payment.created_at)}</span>
      </div>
      <div className="flex flex-direction--column">
        <span className="mb1">Total</span>
        <span>{fromCentsToDollars(total)}</span>
      </div>

      <div className="flex flex-direction--column">
        <span className="mb1">Order #{id}</span>
        <div>
          <Link
            to={`/order/${id}`}
            className="text-decoration--none text-black mr1"
          >
            Order details
          </Link>
          <Link
            target="_blank"
            to={`/invoice/${invoiceId}`}
            className="text-decoration--none text-black mr1"
          >
            Invoice
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
