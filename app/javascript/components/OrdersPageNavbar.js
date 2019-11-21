import React from "react";
import { withRouter, Link } from "react-router-dom";

const OrdersPageNavbar = props => {
  const { pathname } = props.location;
  return (
    <div className="my1 flex orders-page-navbar">
      <Link
        to="/printing-orders"
        className={`mr1 button ${
          pathname == "/printing-orders"
            ? "button--navy"
            : "button-outline button-outline--navy"
        } `}
      >
        Printing Orders
      </Link>

      <Link
        to="/top-up-orders"
        className={`mr1 button ${
          pathname == "/top-up-orders"
            ? "button--navy"
            : "button-outline button-outline--navy"
        } `}
      >
        Top Up Orders
      </Link>
    </div>
  );
};

export default withRouter(OrdersPageNavbar);
