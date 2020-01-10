import React from "react";

import PartnerOrder from "./PartnerOrder";

const PartnerOrderList = ({ noOrderMessage, orders }) =>
  orders.length > 0 ? (
    orders.map((order, index) => <PartnerOrder key={index} order={order} />)
  ) : (
    <p className="h5">{noOrderMessage}</p>
  );

export default PartnerOrderList;
