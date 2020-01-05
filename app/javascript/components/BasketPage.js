import React from "react";
import { connect } from "react-redux";

import OrderLayout from "./OrderLayout";
import OrderItemList from "./OrderItemList";
import { startSetProducts } from "./../actions/products";
import { startSetClientCurrentOrder } from "./../actions/orders";
import Loader from "./Loader";
import { fromCentsToDollars } from "../lib/money";

class BasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetClientCurrentOrder, startSetProducts } = this.props;
    Promise.all([startSetClientCurrentOrder(), startSetProducts()]).then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      const { orderItems, clientCurrentOrder, t } = this.props;
      let { sub_total, number_of_items } = clientCurrentOrder;
      sub_total = fromCentsToDollars(sub_total);
      const currentState = number_of_items > 0 ? 1 : 0;
      return (
        <OrderLayout
          currentState={currentState}
          title={t("basketPage.title")}
          info={t("basketPage.info", {
            count: number_of_items,
            subTotal: sub_total
          })}
          nextButton={{
            link: "/order/pick-up-location",
            text: t("basketPage.nextButtonText"),
            disabled: orderItems.length == 0
          }}
        >
          <div className="content-container">
            <OrderItemList orderItems={orderItems} order={clientCurrentOrder} />
          </div>
        </OrderLayout>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    orderItems: state.orderItems,
    clientCurrentOrder: state.clientCurrentOrder
  };
};

const mapDispatchToProps = dispatch => ({
  startSetProducts: () => dispatch(startSetProducts()),
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
