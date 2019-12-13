import React from "react";
import SubNavBar from "./SubNavBar";

const OrderSubNavBar = () => (
  <SubNavBar
    links={[
      { url: "/printing-orders", text: "Printing Orders" },
      { url: "/top-up-orders", text: "Top Up Orders" }
    ]}
  />
);

export default OrderSubNavBar;
