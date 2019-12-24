import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
import PrintShopNearMePage from "./PrintShopNearMePage";
import PartnerApplicationPage from "./PartnerApplicationPage";
import TermsAndConditions from "./TermsAndConditions";
import DocumentShowPage from "./DocumentShowPage";
import AdminLayout from "./AdminLayout";
import AdminLoginPage from "./AdminLoginPage";
import NewPartnerApplicationsPage from "./NewPartnerApplicationsPage";
import ArchivedPartnerApplicationsPage from "./ArchivedPartnerApplicationsPage";
import AdminHomePage from "./AdminHomePage";
import AdminPartnerApplicationEditPage from "./AdminPartnerApplicationEditPage";
import AdminPartnerApplicationsNewPage from "./AdminPartnerApplicationsNewPage";
import ActivationPage from "./ActivationPage";
import ActivationThankYouPage from "./ActivationThankYouPage";
import i18n from "./../translations/i18n";

const store = configureStore();

const AppRoute = ({
  component: Component,
  Layout = null,
  title = null,
  description = null,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Route
      {...rest}
      render={props =>
        Layout ? (
          <Layout title={title} description={description}>
            <Component {...props} t={t} />
          </Layout>
        ) : (
          <Component {...props} t={t} />
        )
      }
    />
  );
};

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

const PublicAdminLoginPage = () => <PublicRoute component={AdminLoginPage} />;
const PrivateNewPartnerApplicationsPage = () => (
  <PrivateRoute component={NewPartnerApplicationsPage} />
);
const PrivateArchivedPartnerApplicationsPage = () => (
  <PrivateRoute component={ArchivedPartnerApplicationsPage} />
);

const PrivateAdminHomePage = () => <PrivateRoute component={AdminHomePage} />;

const PrivateAdminPartnerApplicationEditPage = () => (
  <PrivateRoute component={AdminPartnerApplicationEditPage} />
);

const PrivatePrintOrderThankYouPage = () => (
  <PrivateRoute component={ThankYouPage} />
);

const PrivateAdminPartnerApplicationsNewPage = () => (
  <PrivateRoute component={AdminPartnerApplicationsNewPage} />
);
const PublicActivationPage = () => <PublicRoute component={ActivationPage} />;
const PublicActivationThankYouPage = () => (
  <PublicRoute component={ActivationThankYouPage} />
);

class App extends React.Component {
  componentDidMount() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              {/* Order Layout */}
              <AppRoute path="/order/basket" component={BasketPage} />
              <AppRoute
                path="/order/pick-up-location"
                component={OrderPickUpLocationPage}
              />
              <AppRoute path="/order/payment" component={PaymentPage} />
              <AppRoute
                path="/order/:id/thank-you"
                component={PrivatePrintOrderThankYouPage}
              />
              {/* Order Layout */}

              {/* Main Layout */}
              <AppRoute
                exact
                path="/"
                Layout={Layout}
                title="Home"
                component={HomePage}
              />
              <AppRoute
                exact
                path="/terms-and-conditions"
                Layout={Layout}
                title="Terms And Conditions"
                component={TermsAndConditions}
              />

              <AppRoute
                exact
                path="/become-partner/application"
                Layout={Layout}
                title="Become Partner - Application"
                component={PartnerApplicationPage}
              />
              <AppRoute
                exact
                path="/print-shops-near-me"
                Layout={Layout}
                title="Print Shops Near Me"
                component={PrintShopNearMePage}
              />
              <AppRoute
                exact
                path="/pricing"
                Layout={Layout}
                title="Pricing"
                component={PricingPage}
              />
              <AppRoute
                exact
                path="/top-up/:id"
                Layout={Layout}
                title="Top up"
                component={TopUpProductCheckoutPage}
              />
              <AppRoute
                exact
                path="/top-up-order/:id/thank-you"
                Layout={Layout}
                title="Thank you!"
                component={PrivateTopUpOrderThankYouPage}
              />
              <AppRoute
                title="Become a Partner"
                path="/become-partner"
                Layout={Layout}
                component={PartnerPage}
              />
              <AppRoute
                title="Your Printing Orders"
                Layout={Layout}
                path="/printing-orders"
                component={PrivatePrintingOrdersPage}
              />
              <AppRoute
                title="Your Top Up Orders"
                Layout={Layout}
                path="/top-up-orders"
                component={PrivateTopUpOrdersPage}
              />
              <AppRoute
                title="Your Documents"
                path="/documents"
                Layout={Layout}
                component={PrivateDocumentsPage}
              />
              <AppRoute
                title="Document"
                path="/document/:id"
                Layout={Layout}
                component={DocumentShowPage}
              />
              <AppRoute
                title="Login"
                path="/login"
                Layout={Layout}
                component={PublicUserLoginPage}
              />
              <AppRoute
                title="Your Order"
                path="/order/:id"
                Layout={Layout}
                component={PrivateOrderShowPage}
              />
              <AppRoute
                title="Your Wallet"
                path="/wallet"
                Layout={Layout}
                component={WalletPage}
              />
              <AppRoute
                title="Your Invoice"
                path="/invoice/:id"
                Layout={Layout}
                component={PrivateInvoicePage}
              />
              {/* Main Layout */}

              {/* Partner Layout */}
              <AppRoute
                exact
                path="/partner"
                Layout={PartnerLayout}
                title="Home"
                component={PrivatePartnerHomePage}
              />
              <AppRoute
                path="/partner/login"
                title="Login"
                Layout={PartnerLayout}
                component={PublicPartnerLoginPage}
              />

              <AppRoute
                title="Order"
                path="/partner/order/:secretCode"
                Layout={PartnerLayout}
                component={PrivatePartnerOrderPage}
              />

              <AppRoute
                path="/partner/awaiting-confirmation"
                title="Awaiting Confirmations"
                Layout={PartnerLayout}
                component={PrivateOrderAwaitingConfirmationPage}
              />
              <AppRoute
                title="Printed Orders"
                path="/partner/printed-orders"
                Layout={PartnerLayout}
                component={PrivatePrintedOrderPage}
              />
              <AppRoute
                title="My Location"
                path="/partner/location"
                Layout={PartnerLayout}
                component={PrivatePartnerLocationPage}
              />
              <AppRoute
                exact
                title="Activation"
                path="/partner/activation/thank-you"
                Layout={PartnerLayout}
                component={PublicActivationThankYouPage}
              />
              <AppRoute
                title="Activation"
                path="/partner/activation/:token"
                Layout={PartnerLayout}
                component={PublicActivationPage}
              />

              {/* Partner Layout */}

              {/* Admin Layout */}
              <AppRoute
                exact
                title="Home"
                path="/admin"
                Layout={AdminLayout}
                component={PrivateAdminHomePage}
              />
              <AppRoute
                title="Login"
                path="/admin/login"
                Layout={AdminLayout}
                component={PublicAdminLoginPage}
              />
              <AppRoute
                title="New Applications"
                path="/admin/new-partner-applications"
                Layout={AdminLayout}
                component={PrivateNewPartnerApplicationsPage}
              />
              <AppRoute
                title="Archived Applications"
                path="/admin/archived-partner-applications"
                Layout={AdminLayout}
                component={PrivateArchivedPartnerApplicationsPage}
              />
              <AppRoute
                title="Partner Application"
                path="/admin/partner-application/:id"
                Layout={AdminLayout}
                component={PrivateAdminPartnerApplicationEditPage}
              />
              <AppRoute
                title="Partner Application - New"
                path="/admin/partner-applications/new"
                Layout={AdminLayout}
                component={PrivateAdminPartnerApplicationsNewPage}
              />
              {/* Admin Layout */}
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

export default App;
