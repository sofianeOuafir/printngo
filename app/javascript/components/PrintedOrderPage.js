import React from "react";
import { connect } from "react-redux";
import PartnerOrder from "./PartnerOrder";

import { printedOrders } from "./../lib/filters";
import PartnerLayout from "./PartnerLayout";

const PrintedOrderPage = ({ orders }) => {
  return (
    <PartnerLayout>
      <div className="content-container">
        <h1 className="h4 text-navy favourite-font-weight">Printed Orders</h1>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <PartnerOrder key={index} order={order} />
          ))
        ) : (
          <p className="h5">You didn't print any order yet.</p>
        )}
      </div>
    </PartnerLayout>
  );
};

const mapStateToProps = state => ({
  orders: printedOrders(state.partnerOrders)
});

export default connect(mapStateToProps)(PrintedOrderPage);
