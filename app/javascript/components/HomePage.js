import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { scroller } from "react-scroll";
import { useTranslation } from "react-i18next";

import HowItWorks from "./HowItWorks";
import WhyPrintnGo from "./WhyPrintnGo";
import LandingPageSection from "./LandingPageSection";
import images from "./../images";
import UploadAndPrintButton from "./UploadAndPrintButton";

const SeeHowItWorksButtonMainSection = props => {
  const { t } = useTranslation();

  return (
    <HashLink
      onClick={e => {
        e.preventDefault();
        scroller.scrollTo("how-it-works", {
          duration: 1500,
          smooth: true
        });
      }}
      to="/#"
      {...props}
    >
      {t("home.main.howItWorks")} &darr;
    </HashLink>
  );
};

const UploadAndPrintButtonMainSection = props => {
  const { t } = useTranslation();

  return (
    <UploadAndPrintButton
      text={t("callToAction.printNow")}
      {...props}
      className="px0 fullwidth button button--leaf"
    />
  );
};

const UploadAndPrintOtherSection = props => {
  const { t } = useTranslation();

  return <UploadAndPrintButton text={t("callToAction.printNow")} {...props} />;
};
const GoToPricingPageElement = props => {
  const { t } = useTranslation();
  return (
    <Link to="/pricing" {...props}>
      {t("callToAction.checkOutPricing")}
    </Link>
  );
};
const GoToLocationPageElement = props => {
  const { t } = useTranslation();

  return (
    <Link to="/print-shops-near-me" {...props}>
      {t("callToAction.findPrinter")}
    </Link>
  );
};
const ContactUsButton = props => {
  const { t } = useTranslation();
  return (
    <a
      href={t("home.contact.link")}
      {...props}
      className="second-call-to-action button button-outline"
    >
      {t("callToAction.contactUs")}
    </a>
  );
};
class HomePage extends React.Component {
  render() {
    const { t } = this.props;
    const sections = [
      {
        title: t("home.main.title"),
        description: t("home.main.description"),
        imgSrc: images.logoOnly,
        imgAlt: "Printer Icon",
        bgColour: "bg-navy",
        reverse: false,
        CallToActionButton: UploadAndPrintButtonMainSection,
        SecondCallToActionButton: SeeHowItWorksButtonMainSection
      },
      {
        title: t("home.quickest.title"),
        description: t("home.quickest.description"),
        imgSrc: images.runningMan,
        imgAlt: "Quickest printing service icon",
        bgColour: "bg-navy",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintOtherSection
      },
      {
        title: t("home.closest.title"),
        description: t("home.closest.description"),
        imgSrc: images.pinpoint,
        imgAlt: "Closest printing service icon",
        bgColour: "bg-leaf",
        reverse: false,
        SecondCallToActionButton: GoToLocationPageElement
      },
      {
        title: t("home.privacyOriented.title"),
        description: t("home.privacyOriented.description"),
        imgSrc: images.lock,
        imgAlt: "privacy oriented icon",
        bgColour: "bg-christmas-tree",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintOtherSection
      },
      {
        title: t("home.securePayment.title"),
        description: t("home.securePayment.description"),
        imgSrc: images.debitCard,
        imgAlt: "no more coins icon",
        bgColour: "bg-navy",
        reverse: false,
        SecondCallToActionButton: UploadAndPrintOtherSection
      },
      {
        title: t("home.storeDocument.title"),
        description: t("home.storeDocument.description"),
        imgSrc: images.hourglass,
        imgAlt: "Printing service always quicker icon",
        bgColour: "bg-leaf",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintOtherSection
      },
      {
        title: t("home.bestValue.title"),
        description: t("home.bestValue.description"),
        imgSrc: images.moneyBag,
        imgAlt: "Best printing service at best price icon",
        bgColour: "bg-christmas-tree",
        reverse: false,
        SecondCallToActionButton: GoToPricingPageElement
      },
      {
        title: t("home.ecoFriendly.title"),
        description: t("home.ecoFriendly.description"),
        imgSrc: images.sprout,
        imgAlt: "Eco Frendly",
        bgColour: "bg-navy",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintOtherSection
      },
      {
        id: "contact-us",
        title: t("home.contact.title"),
        description: t("home.contact.description"),
        imgSrc: images.contact,
        imgAlt: "Contact Us",
        bgColour: "bg-leaf",
        color: "text-white",
        SecondCallToActionButton: ContactUsButton,
        reverse: false
      }
    ];
    return (
      <Fragment>
        {sections.map((section, index) => {
          if (index === 1) {
            return (
              <Fragment key={index}>
                <WhyPrintnGo />
                <HowItWorks />
                <LandingPageSection {...section} />
              </Fragment>
            );
          } else {
            return <LandingPageSection key={index} {...section} />;
          }
        })}
      </Fragment>
    );
  }
}

export default HomePage;
