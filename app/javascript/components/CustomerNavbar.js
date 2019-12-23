import React, { Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { scroller } from "react-scroll";
import ModalVideo from "react-modal-video";
import { withTranslation } from "react-i18next";

import { startLogout } from "../actions/auth";
import { startSetClientCurrentOrder } from "../actions/orders";
import UploadAndPrintButton from "./UploadAndPrintButton";
import SignInLink from "./SignInLink";
import WalletElement from "./WalletElement";
import { INTRODUCTION_VIDEO_ID } from "../constants/constants";
import Navbar from "./Navbar";
import SignOutLink from "./SignOutLink";

class CustomerNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      videoModalOpen: false
    };
  }

  componentDidMount() {
    this.props.startSetClientCurrentOrder().then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }

  onLogout = () => {
    this.props.startLogout().then(() => {
      location.reload();
    });
  };

  navigateAndScroll = ({ e, element }) => {
    e.preventDefault();
    new Promise(resolve => {
      this.props.history.push("/");
      resolve();
    }).then(() => {
      scroller.scrollTo(element, {
        duration: 1500,
        smooth: true
      });
    });
  };

  onLanguageChange = async language => {
    const { i18n } = this.props;
    await i18n.changeLanguage(language);
  };

  render() {
    const { clientCurrentOrder, t } = this.props;

    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/documents">{t("navbar.customer.documents")}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="/printing-orders">{t("navbar.customer.orders")}</Link>
        )
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link
            onClick={e =>
              this.navigateAndScroll({ e, element: "how-it-works" })
            }
            to="#"
          >
            {t("navbar.customer.howItWorks")}
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link
            onClick={e => {
              e.preventDefault();
              this.setState(() => ({ videoModalOpen: true }));
            }}
            to="#"
          >
            {t("navbar.customer.whyPrintAndGo")}
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <Link to="/pricing">{t("navbar.customer.pricing")}</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <UploadAndPrintButton text={t("navbar.customer.printNow")} />,
        printElement: true
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link to="/become-partner">{t("navbar.customer.becomePrinter")}</Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link to="/print-shops-near-me">
            {t("navbar.customer.findPrinter")}
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link
            onClick={e => this.navigateAndScroll({ e, element: "contact-us" })}
            to="#"
          >
            {t("navbar.customer.contactUs")}
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: <SignInLink to="/login" />
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <SignOutLink onLogout={this.onLogout} />
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link to="/order/basket">
            <span className="text-orange">
              {t("navbar.customer.basket")} (
              {this.state.loadingData ? 0 : clientCurrentOrder.number_of_items})
            </span>
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <WalletElement className="text-pink" />
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link to="#" onClick={() => this.onLanguageChange("fr")}>
            Fr
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: (
          <Link to="#" onClick={() => this.onLanguageChange("en")}>
            En
          </Link>
        )
      }
    ];

    return (
      <Fragment>
        <Navbar logoRedirectTo="/" navBarItems={navBarItems} />

        <ModalVideo
          channel="youtube"
          autoplay={1}
          isOpen={this.state.videoModalOpen}
          videoId={INTRODUCTION_VIDEO_ID}
          onClose={() => this.setState({ videoModalOpen: false })}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  clientCurrentOrder: state.clientCurrentOrder
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(CustomerNavbar)));
