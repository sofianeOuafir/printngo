import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Steps, { Step } from "rc-steps";
import { Helmet } from "react-helmet";
import { withTranslation } from "react-i18next";

import Logo from "./Logo";
import WalletElement from "./WalletElement";

const OrderLayout = ({
  title,
  info = null,
  children,
  nextButton = null,
  currentState,
  stickyBar = true,
  t
}) => (
  <Fragment>
    <Helmet>
      <title>Print And Go - {title}</title>
    </Helmet>
    <div
      style={{ height: "75px" }}
      className="navbar bg-navy fullwidth flex align-items--center border--bottom border-color--white"
    >
      <div className="content-container justify-content--between flex align-items--center fullwidth">
        <Link to="/">
          <Logo />
        </Link>
        <WalletElement className="text-pink" />
      </div>
    </div>
    <div className="mt2 content-container">
      <Steps current={currentState}>
        <Step
          title={t("orderLayout.uploadStep.title")}
          description={t("orderLayout.uploadStep.description")}
        />
        <Step
          title={t("orderLayout.basketStep.title")}
          description={t("orderLayout.basketStep.description")}
        />
        <Step
          title={t("orderLayout.locationStep.title")}
          description={t("orderLayout.locationStep.description")}
        />
        <Step
          title={t("orderLayout.paymentStep.title")}
          description={t("orderLayout.paymentStep.title")}
        />
        <Step
          title={t("orderLayout.thanksStep.title")}
          description={t("orderLayout.thanksStep.description")}
        />
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

export default withTranslation()(OrderLayout);
