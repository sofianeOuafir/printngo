import React from "react";
import { connect } from "react-redux";

import { withTranslation } from "react-i18next";

import Order from "./Order";
const OrderList = ({ clientOrders, t }) => {
  return clientOrders.length ? (
    clientOrders.map((order, index) => {
      return <Order order={order} key={index} />;
    })
  ) : (
    <p className="h5">{t("orderList.noOrder")}</p>
  );
};

const mapStateToProps = ({ clientOrders }) => ({
  clientOrders
});

export default connect(mapStateToProps)(withTranslation()(OrderList));
