import React from "react";
import { connect } from "react-redux";

import PartnerOrderList from "./PartnerOrderList";
import { startSetPartnerOrders } from "../actions/orders";
import { awaitingConfirmationOrders } from "./../lib/filters";
import Loader from "./Loader";

class OrderAwaitingConfirmationPage extends React.Component {
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
    const { orders, t } = this.props;
    const { loadingData } = this.state;
    return (
      <div className="content-container">
        <h1 className="h4 text-navy favourite-font-weight">
          {t("orderAwaitingConfirmationPage.title")}
        </h1>

        {loadingData ? (
          <Loader />
        ) : (
          <PartnerOrderList
            orders={orders}
            noOrderMessage={t("orderAwaitingConfirmationPage.noOrder")}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: awaitingConfirmationOrders(state.partnerOrders)
});

const mapDispatchToProps = dispatch => ({
  startSetPartnerOrders: () => dispatch(startSetPartnerOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderAwaitingConfirmationPage);
