import React from "react";
import { connect } from "react-redux";

import Loader from "./Loader";
import { startSetClientOrders } from "../actions/orders";
import OrderList from "./OrderList";
import OrdersPageNavbar from "./OrdersPageNavbar";

class PrintingOrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetClientOrders } = this.props;
    startSetClientOrders().then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      return (
        <div className="content-container">
          <OrdersPageNavbar />
          <OrderList />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  startSetClientOrders: () => dispatch(startSetClientOrders())
});

export default connect(null, mapDispatchToProps)(PrintingOrdersPage);
