import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import { connect } from "react-redux";

import Logo from "./Logo";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerMenuOpen: false
    };
  }

  onHamburgerMenuClick = () => {
    this.setState(() => ({ hamburgerMenuOpen: !this.state.hamburgerMenuOpen }));
  };

  onLogoClick = e => {
    e.preventDefault();
    const { logoRedirectTo } = this.props;
    this.setState(() => ({ hamburgerMenuOpen: false }));
    this.props.history.push(logoRedirectTo);
  };

  render() {
    const { navBarItems, auth } = this.props;
    const { authenticated } = auth;

    return (
      <Fragment>
        <div
          style={{ height: "75px" }}
          className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white"
        >
          <div className="content-container flex justify-content--between align-items--center fullwidth">
            <Link onClick={this.onLogoClick} to="#">
              <Logo />
            </Link>
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

const mapStateToProps = ({ auth }) => ({
  auth: auth
});
export default connect(mapStateToProps)(withRouter(Navbar));
