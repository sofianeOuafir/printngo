import React from "react";
import pluralize from "pluralize";
import OrderItem from "./OrderItem";
import { withTranslation } from "react-i18next";

import UploadAndPrintButton from "./UploadAndPrintButton";
import { fromCentsToDollars } from "../lib/money";

class OrderItemList extends React.Component {
  render() {
    const { order, orderItems, readOnly = false, t } = this.props;
    let { sub_total, tax_amount, total, number_of_items } = order;
    sub_total = fromCentsToDollars(sub_total);
    tax_amount = fromCentsToDollars(tax_amount);
    total = fromCentsToDollars(total);

    return (
      <React.Fragment>
        {orderItems.length ? (
          orderItems.map((orderItem, index) => (
            <OrderItem key={index} orderItem={orderItem} readOnly={readOnly} />
          ))
        ) : (
          <p className="h5 order-item-list--empty">
            {t("orderItemList.empty")}
          </p>
        )}
        <div
          className={`order-item-list--totals flex ${
            readOnly ? "justify-content--end" : "justify-content--between"
          }  h5`}
        >
          {!readOnly && (
            <div>
              <UploadAndPrintButton
                className="button button--navy"
                text={t("orderItemList.upload")}
              />
            </div>
          )}
          <div className={`flex flex-direction--column`}>
            <div className="flex justify-content--between">
              <span className="mr1">
                {t("orderItemList.subtotal", { count: number_of_items })}
              </span>
              <span> {`${sub_total}`}</span>
            </div>
            <div className="flex justify-content--between">
              <span className="mr1">{t("orderItemList.taxes")}</span>
              <span>{`${tax_amount}`}</span>
            </div>
            <div className="flex justify-content--between">
              <span>{t("orderItemList.total")}</span>
              <span>{`${total}`}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(OrderItemList);
