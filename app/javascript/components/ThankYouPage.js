import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import OrderLayout from "./OrderLayout";
import images from "./../images";
import { startSetClientOrder } from "./../actions/orders";
import Loader from "./Loader";
import Partner from "./Partner";

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
          <div className="mx1 content-container border border-color--grey h5 flex justify-content--center">
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
              <div className="flex justify-content--between">
                <Link
                  className="mt3 button button-outline--pink"
                  to={`/order/${this.props.match.params.id}`}
                >
                  {t("printOrderThankYouPage.seeOrder")}
                </Link>
                <Link
                  className="mt3 button button-outline--pink"
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
