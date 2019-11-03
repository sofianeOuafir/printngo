import React from "react";
import { connect } from "react-redux";
import PartnerOrder from "./PartnerOrder";

import { awaitingConfirmationOrders } from "./../lib/filters";

const OrderAwaitingConfirmationPage = ({ orders }) => {
  return (
    <div className="content-container">
      <h1 className="h4 text-navy favourite-font-weight">
        Awaiting Confirmation Orders
      </h1>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <PartnerOrder readOnly={true} key={index} order={order} />
        ))
      ) : (
        <p className="h5">
          All good! You don't have any order awaiting for confirmation.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  orders: awaitingConfirmationOrders(state.partnerOrders)
});

export default connect(mapStateToProps)(OrderAwaitingConfirmationPage);
