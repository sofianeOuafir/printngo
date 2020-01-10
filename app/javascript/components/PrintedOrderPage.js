import React from "react";
import { connect } from "react-redux";

import PartnerOrderList from "./PartnerOrderList";
import { startSetPartnerOrders } from "../actions/orders";
import { printedOrders } from "./../lib/filters";
import Loader from "./Loader";

class PrintedOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }
  componentDidMount() {
    const { startSetPartnerOrders } = this.props;
    startSetPartnerOrders().then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }
  render() {
    const { loadingData } = this.state;
    const { orders, t } = this.props;
    return (
      <div className="content-container">
        <h1 className="h4 text-navy favourite-font-weight">
          {t("printedOrderPage.title")}
        </h1>
        {loadingData ? (
          <Loader />
        ) : (
          <PartnerOrderList
            orders={orders}
            noOrderMessage={t("printedOrderPage.noOrder")}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: printedOrders(state.partnerOrders)
});

const mapDispatchToProps = dispatch => ({
  startSetPartnerOrders: () => dispatch(startSetPartnerOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintedOrderPage);
