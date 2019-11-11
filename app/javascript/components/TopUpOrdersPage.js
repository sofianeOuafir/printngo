import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import Loader from "./Loader";
import { startSetClientOrders } from "../actions/orders";
import OrderList from "./OrderList";

class TopUpOrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetClientOrders } = this.props;
    startSetClientOrders("/api/v1/users/top_up_orders").then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      return (
        <div className="content-container">
          <div className="my1">
            <Link
              to="/printing-orders"
              className="mr1 button button-outline button-outline--navy"
            >
              Printing Orders
            </Link>

            <Link to="/top-up-orders" className="button button--navy button">
              Top Up Orders
            </Link>
          </div>

          <OrderList />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  startSetClientOrders: url => dispatch(startSetClientOrders(url))
});

export default connect(
  null,
  mapDispatchToProps
)(TopUpOrdersPage);
