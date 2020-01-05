import React from "react";
import { connect } from "react-redux";
import PartnerOrder from "./PartnerOrder";

import { printedOrders } from "./../lib/filters";

const PrintedOrderPage = ({ orders, t }) => {
  return (
    <div className="content-container">
      <h1 className="h4 text-navy favourite-font-weight">
        {t("printedOrderPage.title")}
      </h1>
      {orders.length > 0 ? (
        orders.map((order, index) => <PartnerOrder key={index} order={order} />)
      ) : (
        <p className="h5">{t("printedOrderPage.noOrder")}</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  orders: printedOrders(state.partnerOrders)
});

export default connect(mapStateToProps)(PrintedOrderPage);
