import React, { Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { scroller } from "react-scroll";

import { startLogout } from "./../actions/auth";
import { startSetClientCurrentOrder } from "./../actions/orders";
import UploadAndPrintButton from "./UploadAndPrintButton";
import SignInLink from "./SignInLink";
import WalletElement from "./WalletElement";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
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
    const { auth, clientCurrentOrder } = this.props;
    const { authenticated, firstname } = auth;
    const pricingElement = <Link to="/pricing">Pricing</Link>;
    const contactUsElement = (
      <Link
        onClick={e => this.navigateAndScroll({ e, element: "contact-us" })}
        to="#"
      >
        Contact Us
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

    return (
      <div
        style={{ height: "75px" }}
        className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white"
      >
        <div className="content-container flex justify-content--between align-items--center fullwidth">
          <div>
            <Link className="website-name" to="/">
              Print N' Go
            </Link>
          </div>
          <div>
            {authenticated ? (
              <Fragment>
                <Link to="/documents">Documents</Link>
                <Link to="/orders">Orders</Link>
                {pricingElement}
                <UploadAndPrintButton text="Upload & Print" />
                <Link to="/become-partner">Become Partner</Link>
                {contactUsElement}
                <Link to="/">{firstname}</Link>
                <Link to="#" onClick={this.onLogout}>
                  Log out
                </Link>
                {basketElement}
                <WalletElement />
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  onClick={e =>
                    this.navigateAndScroll({ e, element: "how-it-works" })
                  }
                  to="#"
                >
                  How it works
                </Link>
                <Link
                  onClick={e =>
                    this.navigateAndScroll({ e, element: "why-print-n-go" })
                  }
                  to="#"
                >
                  Why Print n' go
                </Link>
                {pricingElement}
                <UploadAndPrintButton text="Upload & Print" />
                <Link to="/become-partner">Become Partner</Link>
                {contactUsElement}
                <SignInLink />
                {basketElement}
                <WalletElement />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  clientCurrentOrder: state.clientCurrentOrder
});

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  startSetClientCurrentOrder: () => dispatch(startSetClientCurrentOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
