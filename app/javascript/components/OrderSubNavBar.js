import React from "react";

import SubNavBar from "./SubNavBar";
import { withTranslation } from "react-i18next";

const OrderSubNavBar = ({ t }) => (
  <SubNavBar
    links={[
      { url: "/printing-orders", text: t("orderSubNavBar.printingOrders") },
      { url: "/top-up-orders", text: t("orderSubNavBar.topUpOrders") }
    ]}
  />
);

export default withTranslation()(OrderSubNavBar);
