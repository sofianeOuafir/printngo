import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import OrderItemList from "./OrderItemList";
import Loader from "./Loader";
import { withRouter } from "react-router-dom";
import Partner from "./Partner";
import { startSetClientOrder } from "./../actions/orders";

class OrderShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetClientOrder } = this.props;
    startSetClientOrder(this.props.match.params.id).then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    const { clientOrder: order, orderItems } = this.props;
    return (
      <Fragment>
        {this.state.loadingData ? (
          <Loader />
        ) : (
          <div className="h5 content-container my2">
            <Link to="/printing-orders" className="text-navy">
              &larr; See All Orders
            </Link>
            <div className="flex justify-content--between align-items--center">
              <h1 className="h4 text-navy favourite-font-weight">
                Order #{order.id} - Secret Code: {order.secret_code}
              </h1>
              <Link
                target="_blank"
                className="text-navy"
                to={`/invoice/${order.invoice.id}`}
              >
                See Invoice
              </Link>
            </div>
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">
                Pick up Location
              </h2>
              <Partner partner={order.selected_partner} />
            </div>
            <div className="p2 border border-color--grey">
              <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
              <OrderItemList
                readOnly={true}
                orderItems={orderItems}
                order={order}
              />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ clientOrder }) => ({
  clientOrder: clientOrder,
  orderItems: clientOrder.order_items
});
const mapDispatchToProps = dispatch => ({
  startSetClientOrder: id => dispatch(startSetClientOrder(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OrderShowPage));
