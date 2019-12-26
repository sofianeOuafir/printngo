import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { fromCentsToDollars } from "../lib/money";
import { getDateTimeFormat } from "../lib/date";
import OrderStatus from "./OrderStatus";
import ReportIssue from "./ReportIssue";

const Order = ({ order, t }) => {
  const { total, id, payment, invoice } = order;
  const invoiceId = invoice ? invoice.id : null;
  return (
    <div className="order--container border border-color--grey p1 mb1">
      <div className="order h5 flex justify-content--between align-items--center center">
        {order.print_order && (
          <div className="flex flex-direction--column">
            <OrderStatus printable={order} />
          </div>
        )}
        <div className="order--created-at flex flex-direction--column">
          <span className="mb1">{t("order.orderPlacedAt")}</span>
          <span>{getDateTimeFormat(payment.created_at)}</span>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb1">{t("order.total")}</span>
          <span>{fromCentsToDollars(total)}</span>
        </div>

        <div className="flex flex-direction--column">
          <span className="mb1">{t("order.orderNumber", { id })}</span>
          <div className="flex flex-direction--column">
            {order.print_order && (
              <Link
                to={`/order/${id}`}
                className="text-navy mr1 order--order-details"
              >
                {t("order.details")}
              </Link>
            )}
            <Link to={`/invoice/${invoiceId}`} className="text-navy mr1">
              {t("order.invoice")}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt1">
        <ReportIssue className="report-issue text-pink" order={order} />
      </div>
    </div>
  );
};

export default withTranslation()(Order);
