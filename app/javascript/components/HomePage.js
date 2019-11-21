import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { scroller } from "react-scroll";

import HowItWorks from "./HowItWorks";
import LandingPageSection from "./LandingPageSection";
import images from "./../images";
import UploadAndPrintButton from "./UploadAndPrintButton";

const SeeHowItWorksButtonMainSection = props => (
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
    See How It Works &darr;
  </HashLink>
);

const UploadAndPrintButtonMainSection = props => (
  <UploadAndPrintButton
    {...props}
    className="px0 fullwidth button button--pink"
  />
);
const GoToPricingPageElement = props => (
  <Link to="/pricing" {...props}>
    Check out our Pricing
  </Link>
);
const GoToLocationPageElement = props => (
  <Link to="/pick-up-locations" {...props}>
    Find a Pick Up Location
  </Link>
);
const ContactUsButton = props => (
  <a
    href="mailto:contact@printngo.ca"
    {...props}
    className="second-call-to-action button button-outline button-outline--navy"
  >
    Contact Us
  </a>
);
class HomePage extends React.Component {
  render() {
    const sections = [
      {
        title:
          "Upload your documents, <br /> Choose your closest pick up location, Print n' Go",
        description:
          "Don't have access to a working printer or running out of ink? We got you covered! Print n' go is the <strong class='keyword text-pink h4'>quickest</strong>, <strong class='keyword text-pink h4'>closest</strong>, and <strong class='keyword text-pink h4'>most convenient</strong> way to print documents out there! <br/><br />We are <strong class='keyword text-pink h4'>privacy oriented</strong> and provide a <strong class='keyword text-pink h4'>secure payment system</strong> so you never need coins for printing documents again!",
        imgSrc: images.printer,
        imgAlt: "Printer Icon",
        bgColour: "bg-navy",
        reverse: false,
        CallToActionButton: UploadAndPrintButtonMainSection,
        SecondCallToActionButton: SeeHowItWorksButtonMainSection
      },
      {
        id: "why-print-n-go",
        title: "We are the closest printing service near you",
        description:
          "How? Our pick up locations are your favourite convenient stores, cafes, pharmacies and any kind of shop that has a printing machine.",
        imgSrc: images.pinpoint,
        imgAlt: "Closest printing service icon",
        bgColour: "bg-grapefruit",
        reverse: true,
        SecondCallToActionButton: GoToLocationPageElement
      },
      {
        title: "The quickest process and simplest way for printing documents",
        description:
          "We're close to you, we cut down your travel time.<br /><br />No need to carry around your USB key any longer. Just upload, arrive and print.<br /><br />Once your documents are uploaded, you will no longer need a computer for completing the printing. Our partners, at the pick up locations, will do the printing for you.",
        imgSrc: images.runningMan,
        imgAlt: "Quickest printing service icon",
        bgColour: "bg-green",
        reverse: false,
        SecondCallToActionButton: UploadAndPrintButton
      },
      {
        title: "We are privacy oriented",
        description:
          "Your privacy is the most important for us. We will provide you with a access code so that only you can access and trigger the print of your documents.",
        imgSrc: images.lock,
        imgAlt: "privacy oriented icon",
        bgColour: "bg-navy",
        reverse: false,
        SecondCallToActionButton: UploadAndPrintButton
      },
      {
        title: "No need to have coins anymore",
        description:
          "Simply pay online before hand with our secure payment system.",
        imgSrc: images.debitCard,
        imgAlt: "no more coins icon",
        bgColour: "bg-mustard",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintButton
      },
      {
        title: "We store your documents for printing quicker in the future.",
        description:
          "Once you have uploaded your documents once, we will save them on your account so that you can print them even quicker in the future. <br /> <br /> And if you want to be even quicker, top up your wallet with our amazing top up deals and skip the need of providing your card details each time.",
        imgSrc: images.hourglass,
        imgAlt: "Printing service always quicker icon",
        bgColour: "bg-blue-sky",
        reverse: true,
        SecondCallToActionButton: UploadAndPrintButton
      },
      {
        title: "Best value",
        description: `Our service is awesome, it doesn't mean it should be more expensive! We provide you with the best printing service at the best price.`,
        imgSrc: images.moneyBag,
        imgAlt: "Best printing service at best price icon",
        bgColour: "bg-christmas-tree",
        reverse: false,
        SecondCallToActionButton: GoToPricingPageElement
      },
      {
        id: "contact-us",
        title: "We love hearing from you",
        description:
          "Having questions, want to give a feedback or just say hello? You can contact us anytime at contact@printngo.ca",
        imgSrc: images.contact,
        imgAlt: "Contact Us",
        bgColour: "bg-white",
        color: "text-navy",
        SecondCallToActionButton: ContactUsButton,
        reverse: true
      }
    ];
    return (
      <Fragment>
        {sections.map((section, index) => {
          if (index === 1) {
            return (
              <Fragment key={index}>
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
