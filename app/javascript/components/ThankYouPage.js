import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import OrderLayout from "./OrderLayout";
import images from "./../images";
import { startSetClientOrder } from "./../actions/orders";
import Loader from "./Loader";
import Partner from "./Partner";
import PartnerProductList from "./PartnerProductList";

class ThankYouPage extends React.Component {
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
    if (this.state.loadingData) {
      return <Loader />;
    } else {
      const { partner, clientOrder, t } = this.props;
      const { active_partner_products } = partner;
      const { user, invoice, id, secret_code } = clientOrder;
      const { firstname } = user;
      const currentState = 4;

      return (
        <OrderLayout
          currentState={currentState}
          title={t("printOrderThankYouPage.thankYou")}
          info={t("printOrderThankYouPage.happyPrinting")}
          nextButton={{
            link: `/`,
            text: t("printOrderThankYouPage.nextButton")
          }}
        >
          <div className="mx1 content-container border border-color--grey h5">
            <div className="my2">
              <div className="center">
                <img src={images.success} alt="Success Icon" width={80} />
              </div>
              <h1 className="h4 center thank-you-page--title">
                {t("printOrderThankYouPage.paymentSuccess")}
              </h1>
              <div className="thank-you-page--info">
                {ReactHtmlParser(
                  t("printOrderThankYouPage.info", {
                    firstname,
                    secret_code,
                    id
                  })
                )}

                <Partner partner={partner} />
                <p>{t("printOrderThankYouPage.doNotShare")}</p>
              </div>
              {active_partner_products.length > 0 && (
                <div className="p2 border border-color--grey mb2">
                  <p className="text-navy m0 mb1">
                    {t("printOrderThankYouPage.deals")}
                  </p>
                  <PartnerProductList products={active_partner_products} />
                </div>
              )}
              <div className="flex justify-content--between">
                <Link
                  className="mt3 button button-outline--leaf"
                  to={`/order/${this.props.match.params.id}`}
                >
                  {t("printOrderThankYouPage.seeOrder")}
                </Link>
                <Link
                  className="mt3 button button-outline--leaf"
                  to={`/invoice/${invoice.id}`}
                >
                  {t("printOrderThankYouPage.seeInvoice")}
                </Link>
              </div>
            </div>
          </div>
        </OrderLayout>
      );
    }
  }
}

const mapStateToProps = state => ({
  partner: state.clientOrder.selected_partner,
  clientOrder: state.clientOrder
});

const mapDispatchToProps = dispatch => ({
  startSetClientOrder: id => dispatch(startSetClientOrder(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ThankYouPage));
