import React from "react";
import { Link } from "react-router-dom";

import { fromCentsToDollars } from "../lib/money";
import { getDateTimeFormat } from "../lib/date";
import OrderStatus from "./OrderStatus";
import ReportIssue from "./ReportIssue";

const Order = ({ order }) => {
  const { total, id, payment, invoice } = order;
  const invoiceId = invoice ? invoice.id : null;
  return (
    <div className="border border-color--grey p1 mb1">
      <div className="h5 flex justify-content--between align-items--center center">
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
      <div>
        <ReportIssue className="text-pink" order={order} />
      </div>
    </div>
  );
};

export default Order;
