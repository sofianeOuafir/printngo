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
import AppWithTranslation from "./AppWithTranslation";

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

const PrivatePrintingOrdersPage = props => (
  <PrivateRoute {...props} component={PrintingOrdersPage} />
);
const PrivateTopUpOrdersPage = props => (
  <PrivateRoute {...props} component={TopUpOrdersPage} />
);

const PrivateDocumentsPage = props => (
  <PrivateRoute {...props} component={DocumentsPage} />
);
const PrivateOrderShowPage = props => (
  <PrivateRoute {...props} component={OrderShowPage} />
);
const PrivateInvoicePage = props => (
  <PrivateRoute {...props} component={InvoicePage} />
);
const PrivatePartnerLocationPage = props => (
  <PrivateRoute {...props} component={PartnerLocationPage} />
);
const PrivatePartnerHomePage = props => (
  <PrivateRoute {...props} component={PartnerHomePage} />
);
const PrivatePartnerOrderPage = props => (
  <PrivateRoute {...props} component={PartnerOrderPage} />
);
const PrivatePrintedOrderPage = props => (
  <PrivateRoute {...props} component={PrintedOrderPage} />
);
const PrivateOrderAwaitingConfirmationPage = props => (
  <PrivateRoute {...props} component={OrderAwaitingConfirmationPage} />
);
const PrivateTopUpOrderThankYouPage = props => (
  <PrivateRoute {...props} component={TopUpOrderThankYouPage} />
);

const PublicUserLoginPage = props => (
  <PublicRoute {...props} component={UserLoginPage} />
);
const PublicPartnerLoginPage = props => (
  <PublicRoute {...props} component={PartnerLoginPage} />
);

const PublicAdminLoginPage = props => (
  <PublicRoute {...props} component={AdminLoginPage} />
);
const PrivateNewPartnerApplicationsPage = props => (
  <PrivateRoute {...props} component={NewPartnerApplicationsPage} />
);
const PrivateArchivedPartnerApplicationsPage = props => (
  <PrivateRoute {...props} component={ArchivedPartnerApplicationsPage} />
);

const PrivateAdminHomePage = props => (
  <PrivateRoute {...props} component={AdminHomePage} />
);

const PrivateAdminPartnerApplicationEditPage = props => (
  <PrivateRoute {...props} component={AdminPartnerApplicationEditPage} />
);

const PrivatePrintOrderThankYouPage = props => (
  <PrivateRoute {...props} component={ThankYouPage} />
);

const PrivateAdminPartnerApplicationsNewPage = props => (
  <PrivateRoute {...props} component={AdminPartnerApplicationsNewPage} />
);
const PublicActivationPage = props => (
  <PublicRoute {...props} component={ActivationPage} />
);
const PublicActivationThankYouPage = props => (
  <PublicRoute {...props} component={ActivationThankYouPage} />
);

class App extends React.Component {
  componentDidMount() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;
  }
  render() {
    const { t } = this.props;
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
                title={t("pageTitle.HomePage")}
                component={HomePage}
              />
              <AppRoute
                exact
                path="/terms-and-conditions"
                Layout={Layout}
                title={t("pageTitle.TermsAndConditions")}
                component={TermsAndConditions}
              />

              <AppRoute
                exact
                path="/become-partner/application"
                Layout={Layout}
                title={t("pageTitle.PartnerApplicationPage")}
                component={PartnerApplicationPage}
              />
              <AppRoute
                exact
                path="/print-shops-near-me"
                Layout={Layout}
                title={t("pageTitle.PrintShopNearMePage")}
                component={PrintShopNearMePage}
              />
              <AppRoute
                exact
                path="/pricing"
                Layout={Layout}
                title={t("pageTitle.PricingPage")}
                component={PricingPage}
              />
              <AppRoute
                exact
                path="/top-up/:id"
                Layout={Layout}
                title={t("pageTitle.TopUpProductCheckoutPage")}
                component={TopUpProductCheckoutPage}
              />
              <AppRoute
                exact
                path="/top-up-order/:id/thank-you"
                Layout={Layout}
                title={t("pageTitle.PrivateTopUpOrderThankYouPage")}
                component={PrivateTopUpOrderThankYouPage}
              />
              <AppRoute
                title={t("pageTitle.PartnerPage")}
                path="/become-partner"
                Layout={Layout}
                component={PartnerPage}
              />
              <AppRoute
                title={t("pageTitle.PrivatePrintingOrdersPage")}
                Layout={Layout}
                path="/printing-orders"
                component={PrivatePrintingOrdersPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateTopUpOrdersPage")}
                Layout={Layout}
                path="/top-up-orders"
                component={PrivateTopUpOrdersPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateDocumentsPage")}
                path="/documents"
                Layout={Layout}
                component={PrivateDocumentsPage}
              />
              <AppRoute
                title={t("pageTitle.DocumentShowPage")}
                path="/document/:id"
                Layout={Layout}
                component={DocumentShowPage}
              />
              <AppRoute
                title={t("pageTitle.PublicUserLoginPage")}
                path="/login"
                Layout={Layout}
                component={PublicUserLoginPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateOrderShowPage")}
                path="/order/:id"
                Layout={Layout}
                component={PrivateOrderShowPage}
              />
              <AppRoute
                title={t("pageTitle.WalletPage")}
                path="/wallet"
                Layout={Layout}
                component={WalletPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateInvoicePage")}
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
                title={t("pageTitle.PrivatePartnerHomePage")}
                component={PrivatePartnerHomePage}
              />
              <AppRoute
                path="/partner/login"
                title={t("pageTitle.PublicPartnerLoginPage")}
                Layout={PartnerLayout}
                component={PublicPartnerLoginPage}
              />

              <AppRoute
                title={t("pageTitle.PrivatePartnerOrderPage")}
                path="/partner/order/:secretCode"
                Layout={PartnerLayout}
                component={PrivatePartnerOrderPage}
              />

              <AppRoute
                path="/partner/awaiting-confirmation"
                title={t("pageTitle.PrivateOrderAwaitingConfirmationPage")}
                Layout={PartnerLayout}
                component={PrivateOrderAwaitingConfirmationPage}
              />
              <AppRoute
                title={t("pageTitle.PrivatePrintedOrderPage")}
                path="/partner/printed-orders"
                Layout={PartnerLayout}
                component={PrivatePrintedOrderPage}
              />
              <AppRoute
                title={t("pageTitle.PrivatePartnerLocationPage")}
                path="/partner/location"
                Layout={PartnerLayout}
                component={PrivatePartnerLocationPage}
              />
              <AppRoute
                exact
                title={t("pageTitle.PublicActivationThankYouPage")}
                path="/partner/activation/thank-you"
                Layout={PartnerLayout}
                component={PublicActivationThankYouPage}
              />
              <AppRoute
                title={t("pageTitle.PublicActivationPage")}
                path="/partner/activation/:token"
                Layout={PartnerLayout}
                component={PublicActivationPage}
              />

              {/* Partner Layout */}

              {/* Admin Layout */}
              <AppRoute
                exact
                title={t("pageTitle.PrivateAdminHomePage")}
                path="/admin"
                Layout={AdminLayout}
                component={PrivateAdminHomePage}
              />
              <AppRoute
                title={t("pageTitle.PublicAdminLoginPage")}
                path="/admin/login"
                Layout={AdminLayout}
                component={PublicAdminLoginPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateNewPartnerApplicationsPage")}
                path="/admin/new-partner-applications"
                Layout={AdminLayout}
                component={PrivateNewPartnerApplicationsPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateArchivedPartnerApplicationsPage")}
                path="/admin/archived-partner-applications"
                Layout={AdminLayout}
                component={PrivateArchivedPartnerApplicationsPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateAdminPartnerApplicationEditPage")}
                path="/admin/partner-application/:id"
                Layout={AdminLayout}
                component={PrivateAdminPartnerApplicationEditPage}
              />
              <AppRoute
                title={t("pageTitle.PrivateAdminPartnerApplicationsNewPage")}
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
    ReactDOM.render(<AppWithTranslation />, document.getElementById("app"));
    hasRendered = true;
  }
};

store.dispatch(startGetCurrentUser()).then(() => {
  renderApp();
});

ReactDOM.render(<Loader />, document.getElementById("app"));

export default App;
