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
    const { product } = this.state;
    return (
      <div className="content-container">
        {this.state.loadingData ? (
          <Loader />
        ) : (
          <Fragment>
            <PageBanner
              title={product.name}
              description={product.description}
            />

            <div className="flex border border-color--grey">
              <div className="col-6 px3 border-right border-color--grey">
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
                <div className="px3">
                  <h3 className="text-navy">{product.name}</h3>
                  <p className="text-navy">{product.description}</p>
                  <SellingPointList
                    className="p0"
                    sellingPoints={product.selling_points}
                  />
                </div>
                <div className="mb3 border-top border-color--grey">
                  <AllPlanIncludes />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(TopUpProductCheckoutPage);
