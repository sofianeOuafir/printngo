import React from "react";
import { TOP_UP_ORDER } from "./../constants/constants";
import { Elements, StripeProvider } from "react-stripe-elements";
import { withRouter } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";

class TopUpProductCheckoutPage extends React.Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey={process.env.STRIPE_PUBLIC_KEY}>
          <Elements>
            <CheckoutForm
              redirectUrlAfterSuccess={`/top-up/thank-you`}
              orderType={TOP_UP_ORDER}
              productId={this.props.match.params.id}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default withRouter(TopUpProductCheckoutPage);
