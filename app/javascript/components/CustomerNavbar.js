import React, { Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { scroller } from "react-scroll";
import ModalVideo from "react-modal-video";

import { startLogout } from "../actions/auth";
import { startSetClientCurrentOrder } from "../actions/orders";
import UploadAndPrintButton from "./UploadAndPrintButton";
import SignInLink from "./SignInLink";
import WalletElement from "./WalletElement";
import { INTRODUCTION_VIDEO_ID } from "../constants/constants";
import Navbar from "./Navbar";

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

  render() {
    const { clientCurrentOrder } = this.props;
    const pricingElement = <Link to="/pricing">Pricing</Link>;
    const pickUpLocationsElement = (
      <Link to="/pick-up-locations">Locations</Link>
    );
    const contactUsElement = (
      <Link
        onClick={e => this.navigateAndScroll({ e, element: "contact-us" })}
        to="#"
      >
        Contact
      </Link>
    );
    const basketElement = (
      <Link to="/order/basket">
        <span className="text-orange">
          Basket (
          {this.state.loadingData ? 0 : clientCurrentOrder.number_of_items})
        </span>
      </Link>
    );

    const navBarItems = [
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/documents">Documents</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: <Link to="/printing-orders">Orders</Link>
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
            How it works
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
            Why Print n' Go
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: pricingElement
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <UploadAndPrintButton text="Print Now" />,
        printElement: true
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <Link to="/become-partner">Become Partner</Link>
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: pickUpLocationsElement
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: contactUsElement
      },
      {
        ShowWhenAuthenticated: false,
        ShowWhenNonAuthenticated: true,
        element: <SignInLink />
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: false,
        element: (
          <Link to="#" onClick={this.onLogout}>
            Log out
          </Link>
        )
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: basketElement
      },
      {
        ShowWhenAuthenticated: true,
        ShowWhenNonAuthenticated: true,
        element: <WalletElement />
      }
    ];

    return (
      <Fragment>
        <Navbar
          logoRedirectTo="/"
          navBarItems={navBarItems}
        />

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
)(withRouter(CustomerNavbar));
