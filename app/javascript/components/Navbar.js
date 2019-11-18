import React, { Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { scroller } from "react-scroll";
import HamburgerMenu from "react-hamburger-menu";

import { startLogout } from "./../actions/auth";
import { startSetClientCurrentOrder } from "./../actions/orders";
import UploadAndPrintButton from "./UploadAndPrintButton";
import SignInLink from "./SignInLink";
import WalletElement from "./WalletElement";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      hamburgerMenuOpen: false
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

  onHamburgerMenuClick = () => {
    this.setState(() => ({ hamburgerMenuOpen: !this.state.hamburgerMenuOpen }));
  };

  render() {
    const { auth, clientCurrentOrder } = this.props;
    const { authenticated } = auth;
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
            onClick={e =>
              this.navigateAndScroll({ e, element: "why-print-n-go" })
            }
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
        <div
          style={{ height: "75px" }}
          className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white"
        >
          <div className="content-container flex justify-content--between align-items--center fullwidth">
            <div>
              <Link className="website-name" to="/">
                Print n' Go
              </Link>
            </div>
            <div className="navbar-links">
              {navBarItems.map((item, key) => {
                var jsx = <Fragment key={key}>{item.element}</Fragment>;
                if (authenticated && item.ShowWhenAuthenticated) {
                  return jsx;
                } else if (!authenticated && item.ShowWhenNonAuthenticated) {
                  return jsx;
                }
              })}
            </div>
            <div className="hamburger-menu pointer">
              <HamburgerMenu
                isOpen={this.state.hamburgerMenuOpen}
                menuClicked={this.onHamburgerMenuClick}
                width={30}
                height={20}
                strokeWidth={3}
                rotate={0}
                color="white"
                borderRadius={0}
                animationDuration={0.4}
              />
            </div>
          </div>
        </div>
        {this.state.hamburgerMenuOpen && (
          <div className="hamburger-menu-items">
            {navBarItems.map((item, key) => {
              var jsx = item.printElement ? (
                item.element
              ) : (
                <div key={key} onClick={this.onHamburgerMenuClick}>
                  {item.element}
                </div>
              );

              if (authenticated && item.ShowWhenAuthenticated) {
                return jsx;
              } else if (!authenticated && item.ShowWhenNonAuthenticated) {
                return jsx;
              }
            })}
          </div>
        )}
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
