import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import { Helmet } from "react-helmet";

import Logo from "./Logo";
import WalletElement from "./WalletElement";

const OrderLayout = ({
  title,
  info = null,
  children,
  nextButton = null,
  currentState,
  stickyBar = true
}) => (
  <Fragment>
    <Helmet>
      <title>Print N' Go - {title}</title>
    </Helmet>
    <div
      style={{ height: "75px" }}
      className="navbar flex justify-content--center bg-navy align-items--center"
    >
      <div className="content-container">
        <div className="flex align-items--center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="text-white mr1"> - </div>
          <WalletElement />
        </div>
      </div>
    </div>
    <div className="mt2 content-container">
      <Steps current={currentState}>
        <Step title="Upload" description="Upload your documents" />
        <Step
          title="Basket"
          description="Choose the right products and quantities"
        />
        <Step
          title="Location"
          description="Select the closest location for gathering your documents"
        />
        <Step title="Payment" description="Make a secure payment" />
        <Step title="Done" description="Thanks and happy printing!" />
      </Steps>
    </div>
    <div
      className={`py1 content-container ${stickyBar ? "sticky" : ""} bg-white`}
    >
      <div className="flex h5 justify-content--between align-items--center">
        <h1 className="order-layout--title h5 text-navy favourite-font-weight">
          {title}
        </h1>
        {info && (
          <span className="order-layout--info h5 text-navy">{info}</span>
        )}
        {nextButton && (
          <Link
            style={nextButton.disabled ? { pointerEvents: "none" } : null}
            className={`button order-layout--next-button ${
              nextButton.disabled ? "button--grey" : "button--pink"
            }`}
            to={nextButton.link}
          >
            {nextButton.text}
          </Link>
        )}
      </div>
    </div>
    <div className="mb3 pb3">{children}</div>
  </Fragment>
);

export default OrderLayout;
