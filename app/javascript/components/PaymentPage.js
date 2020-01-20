import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";

import OrderLayout from "./OrderLayout";
import OrderItemList from "./OrderItemList";
import CheckoutForm from "./CheckoutForm";
import { startSetClientCurrentOrder } from "./../actions/orders";
import { startSetProducts } from "./../actions/products";
import Loader from "./Loader";
import Partner from "./Partner";
import { Link } from "react-router-dom";
import { PRINT_ORDER } from "./../constants/constants";
import WalletElement from "./WalletElement";
import PartnerProductList from "./PartnerProductList";

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetClientCurrentOrder, startSetProducts, t } = this.props;
    Promise.all([startSetProducts(), startSetClientCurrentOrder()]).then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  render() {
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      const { clientCurrentOrder, orderItems, t, currentLocale } = this.props;
      const { selected_partner } = clientCurrentOrder;
      const { active_partner_products } = selected_partner;
      const currentState = 3;
      return (
        <OrderLayout
          currentState={currentState}
          title={t("paymentPage.title")}
          info={<WalletElement className="text-navy" />}
          nextButton={{
            text: t("paymentPage.nextButton"),
            link: "/order/payment",
            disabled: true
          }}
        >
          <div className="h5 content-container">
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">
                {t("paymentPage.printShop")}
              </h2>
              <Partner partner={selected_partner} />
              <div className="mt1">
                <Link
                  to="/order/pick-up-location"
                  className="button button-outline button-outline--leaf"
                >
                  &larr; {t("paymentPage.backToPrintShop")}
                </Link>
              </div>
            </div>
            <div className="p2 border border-color--grey mb2">
              <h2 className="h5 text-navy favourite-font-weight">
                {t("paymentPage.yourOrder")}
              </h2>
              <OrderItemList
                orderItems={orderItems}
                order={clientCurrentOrder}
              />
            </div>
            {active_partner_products.length > 0 && (
              <div className="p2 border border-color--grey mb2">
                <p className="text-navy m0 mb1">{t("paymentPage.deals")}</p>
                <PartnerProductList products={active_partner_products} />
              </div>
            )}
            <div className="p2 border border-color--grey">
              <h2 className="h5 text-navy favourite-font-weight">
                {t("paymentPage.payment")}
              </h2>
              <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
                <Elements locale={currentLocale}>
                  <CheckoutForm orderType={PRINT_ORDER} />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </OrderLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  clientCurrentOrder: state.clientCurrentOrder,
  orderItems: state.orderItems,
  walletBalance: state.auth.wallet_balance
});

const mapDispatchToProps = dispatch => ({
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder()),
  startSetProducts: () => dispatch(startSetProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PaymentPage));
