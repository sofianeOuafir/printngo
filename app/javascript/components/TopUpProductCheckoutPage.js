import React, { Fragment } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { withRouter } from "react-router-dom";
import axios from "axios";

import AllPlanIncludes from "./AllPlanIncludes";
import SellingPointList from "./SellingPointList";
import CheckoutForm from "./CheckoutForm";
import Loader from "./Loader";
import { TOP_UP_ORDER } from "./../constants/constants";
import PageBanner from "./PageBanner";
import { fromCentsToDollars } from "./../lib/money";

class TopUpProductCheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      product: {}
    };
  }
  componentDidMount() {
    axios
      .get(`/api/v1/top_up_products/${this.props.match.params.id}`)
      .then(response => {
        this.setState(() => ({ loadingData: false, product: response.data }));
      });
  }
  render() {
    const { t } = this.props;
    const { product } = this.state;
    return (
      <div className="content-container">
        {this.state.loadingData ? (
          <Loader />
        ) : (
          <Fragment>
            <PageBanner
              title={t(`${product.code}.name`, { price: fromCentsToDollars(product.price) })}
              description={t(`${product.code}.description`, {
                allocatedCredit: fromCentsToDollars(product.allocated_credit)
              })}
            />

            <div className="border top-up-product-checkout-page--payment--description-container flex border-color--grey border-bottom--none">
              <div className="col-6 px1 border-right border-color--grey pb1 top-up-product-checkout-page--payment-container">
                <h3 className="text-navy">Payment</h3>
                <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
                  <Elements>
                    <CheckoutForm
                      orderType={TOP_UP_ORDER}
                      productId={this.props.match.params.id}
                    />
                  </Elements>
                </StripeProvider>
              </div>
              <div className="col-6">
                <div className="px3 flex flex-direction--column pb1">
                  <h3 className="text-navy">
                    {t(`${product.code}.name`, { price: fromCentsToDollars(product.price) })}
                  </h3>
                  <p className="text-navy">
                    {t(`${product.code}.description`, {
                      allocatedCredit: fromCentsToDollars(product.allocated_credit)
                    })}
                  </p>
                  <SellingPointList
                    className="p0"
                    sellingPoints={product.selling_points}
                  />
                </div>
              </div>
            </div>
            <div className="border border-color--grey mb3">
              <AllPlanIncludes />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(TopUpProductCheckoutPage);
