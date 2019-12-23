import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import LandingPageSection from "./LandingPageSection";
import images from "./../images";

const PartnerPage = ({ t }) => {
  const GoToPartnerApplicationPageButton = props => (
    <Link
      to="/become-partner/application"
      {...props}
      className="fullwidth px0 button button--pink"
    >
      {t("callToAction.becomePartner")}
    </Link>
  );
  const SecondGoToPartnerApplicationPageButton = props => (
    <Link to="/become-partner/application" {...props}>
      {t("callToAction.becomePartner")}
    </Link>
  );
  const sections = [
    {
      title: t("partnerPage.main.title"),
      description: t("partnerPage.main.description"),
      imgSrc: images.handShake,
      imgAlt: "Become Partner Icon",
      bgColour: "bg-navy",
      reverse: false,
      CallToActionButton: GoToPartnerApplicationPageButton
    },
    {
      title: t("partnerPage.newSourceRevenue.title"),
      description: t("partnerPage.newSourceRevenue.description"),
      imgSrc: images.money,
      imgAlt: "New Source Revenue Icon",
      bgColour: "bg-grapefruit",
      reverse: true,
      SecondCallToActionButton: SecondGoToPartnerApplicationPageButton
    },
    {
      title: t("partnerPage.attractCustomers.title"),
      description: t("partnerPage.attractCustomers.description"),
      imgSrc: images.attract,
      imgAlt: "Attract new customers Icon",
      bgColour: "bg-blue-sky",
      reverse: false,
      SecondCallToActionButton: SecondGoToPartnerApplicationPageButton
    },
    {
      title: t("partnerPage.freePromotion.title"),
      description: t("partnerPage.freePromotion.description"),
      imgSrc: images.shout,
      imgAlt: "Get free promotion Icon",
      bgColour: "bg-christmas-tree",
      reverse: true,
      SecondCallToActionButton: SecondGoToPartnerApplicationPageButton
    },
    {
      title: t("partnerPage.noImpact.title"),
      description: t("partnerPage.noImpact.description"),
      imgSrc: images.yoga,
      imgAlt: "Hassle free Icon",
      bgColour: "bg-navy",
      reverse: true,
      SecondCallToActionButton: SecondGoToPartnerApplicationPageButton
    },
    {
      title: t("partnerPage.reinforceRelationship.title"),
      description: t("partnerPage.reinforceRelationship.description"),
      imgSrc: images.exercise,
      imgAlt: "Reinforce relationship Icon",
      bgColour: "bg-orange",
      reverse: false,
      SecondCallToActionButton: SecondGoToPartnerApplicationPageButton
    }
  ];
  return (
    <Fragment>
      {sections.map((section, index) => (
        <LandingPageSection key={index} {...section} />
      ))}
    </Fragment>
  );
};
export default PartnerPage;
