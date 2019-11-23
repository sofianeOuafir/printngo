import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { startGetCurrentUser } from "./../actions/auth";
import PartnerPage from "./PartnerPage";
import HomePage from "./HomePage";
import OrderPickUpLocationPage from "./OrderPickUpLocationPage";
import BasketPage from "./BasketPage";
import configureStore from "./../configureStore";
import PaymentPage from "./PaymentPage";
import Loader from "./Loader";
import ThankYouPage from "./ThankYouPage";
import UserLoginPage from "./UserLoginPage";
import PrintingOrdersPage from "./PrintingOrdersPage";
import TopUpOrdersPage from "./TopUpOrdersPage";
import DocumentsPage from "./DocumentsPage";
import OrderShowPage from "./OrderShowPage";
import PublicRoute from "../routers/PublicRoute";
import PrivateRoute from "../routers/PrivateRoute";
import InvoicePage from "./InvoicePage";
import PartnerLoginPage from "./PartnerLoginPage";
import PartnerHomePage from "./PartnerHomepage";
import PartnerOrderPage from "./PartnerOrderPage";
import OrderAwaitingConfirmationPage from "./OrderAwaitingConfirmationPage";
import PrintedOrderPage from "./PrintedOrderPage";
import PartnerLocationPage from "./PartnerLocationPage";
import Layout from "./Layout";
import PartnerLayout from "./PartnerLayout";
import PricingPage from "./PricingPage";
import TopUpProductCheckoutPage from "./TopUpProductCheckoutPage";
import TopUpOrderThankYouPage from "./TopUpOrderThankYouPage";
import WalletPage from "./WalletPage";
import ScrollToTop from "./ScrollToTop";
import PickUpLocationsPage from "./PickUpLocationsPage";
import PartnerApplicationPage from "./PartnerApplicationPage";

const store = configureStore();

const AppRoute = ({
  component: Component,
  layout: Layout,
  title = null,
  description = null,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout title={title} description={description}>
        <Component {...props} />
      </Layout>
    )}
  />
);

const PrivatePrintingOrdersPage = () => (
  <PrivateRoute component={PrintingOrdersPage} />
);
const PrivateTopUpOrdersPage = () => (
  <PrivateRoute component={TopUpOrdersPage} />
);

const PrivateDocumentsPage = () => <PrivateRoute component={DocumentsPage} />;
const PrivateOrderShowPage = () => <PrivateRoute component={OrderShowPage} />;
const PrivateInvoicePage = () => <PrivateRoute component={InvoicePage} />;
const PrivatePartnerLocationPage = () => (
  <PrivateRoute component={PartnerLocationPage} />
);
const PrivatePartnerHomePage = () => (
  <PrivateRoute component={PartnerHomePage} />
);
const PrivatePartnerOrderPage = () => (
  <PrivateRoute component={PartnerOrderPage} />
);
const PrivatePrintedOrderPage = () => (
  <PrivateRoute component={PrintedOrderPage} />
);
const PrivateOrderAwaitingConfirmationPage = () => (
  <PrivateRoute component={OrderAwaitingConfirmationPage} />
);
const PrivateTopUpOrderThankYouPage = () => (
  <PrivateRoute component={TopUpOrderThankYouPage} />
);

const PublicUserLoginPage = () => <PublicRoute component={UserLoginPage} />;
const PublicPartnerLoginPage = () => (
  <PublicRoute component={PartnerLoginPage} />
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              {/* Order Layout */}
              <Route path="/order/basket" render={() => <BasketPage />} />
              <Route
                path="/order/pick-up-location"
                render={() => <OrderPickUpLocationPage />}
              />
              <Route path="/order/payment" render={() => <PaymentPage />} />
              <Route
                path="/order/:id/thank-you"
                render={() => <PrivateRoute component={ThankYouPage} />}
              />
              {/* Order Layout */}

              {/* Main Layout */}
              <AppRoute
                exact
                path="/"
                layout={Layout}
                title="Home"
                component={HomePage}
              />
              <AppRoute
                exact
                path="/become-partner/application"
                layout={Layout}
                title="Become Partner - Application"
                component={PartnerApplicationPage}
              />
              <AppRoute
                exact
                path="/pick-up-locations"
                layout={Layout}
                title="Pick Up Locations"
                component={PickUpLocationsPage}
              />
              <AppRoute
                exact
                path="/pricing"
                layout={Layout}
                title="Pricing"
                component={PricingPage}
              />
              <AppRoute
                exact
                path="/top-up/:id"
                layout={Layout}
                title="Top up"
                component={TopUpProductCheckoutPage}
              />
              <AppRoute
                exact
                path="/top-up-order/:id/thank-you"
                layout={Layout}
                title="Thank you!"
                component={PrivateTopUpOrderThankYouPage}
              />
              <AppRoute
                title="Become a Partner"
                path="/become-partner"
                layout={Layout}
                component={PartnerPage}
              />
              <AppRoute
                title="Your Printing Orders"
                layout={Layout}
                path="/printing-orders"
                component={PrivatePrintingOrdersPage}
              />
              <AppRoute
                title="Your Top Up Orders"
                layout={Layout}
                path="/top-up-orders"
                component={PrivateTopUpOrdersPage}
              />
              <AppRoute
                title="Your Documents"
                path="/documents"
                layout={Layout}
                component={PrivateDocumentsPage}
              />
              <AppRoute
                title="Login"
                path="/login"
                layout={Layout}
                component={PublicUserLoginPage}
              />
              <AppRoute
                title="Your Order"
                path="/order/:id"
                layout={Layout}
                component={PrivateOrderShowPage}
              />
              <AppRoute
                title="Your Wallet"
                path="/wallet"
                layout={Layout}
                component={WalletPage}
              />
              <AppRoute
                title="Your Invoice"
                path="/invoice/:id"
                layout={Layout}
                component={PrivateInvoicePage}
              />
              {/* Main Layout */}

              {/* Partner Layout */}
              <AppRoute
                exact
                path="/partner"
                layout={PartnerLayout}
                title="Home"
                component={PrivatePartnerHomePage}
              />
              <AppRoute
                path="/partner/login"
                title="Login"
                layout={PartnerLayout}
                component={PublicPartnerLoginPage}
              />

              <AppRoute
                title="Order"
                path="/partner/order/:secretCode"
                layout={PartnerLayout}
                component={PrivatePartnerOrderPage}
              />

              <AppRoute
                path="/partner/awaiting-confirmation"
                title="Awaiting Confirmations"
                layout={PartnerLayout}
                component={PrivateOrderAwaitingConfirmationPage}
              />
              <AppRoute
                title="Printed Orders"
                path="/partner/printed-orders"
                layout={PartnerLayout}
                component={PrivatePrintedOrderPage}
              />
              <AppRoute
                title="My Location"
                path="/partner/location"
                layout={PartnerLayout}
                component={PrivatePartnerLocationPage}
              />
              {/* Partner Layout */}
            </Switch>
          </ScrollToTop>
          <ToastContainer autoClose={2000} />
        </BrowserRouter>
      </Provider>
    );
  }
}

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<App />, document.getElementById("app"));
    hasRendered = true;
  }
};

store.dispatch(startGetCurrentUser()).then(() => {
  renderApp();
});

ReactDOM.render(<Loader />, document.getElementById("app"));

export default Loader;
