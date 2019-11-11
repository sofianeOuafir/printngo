import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


import HowItWorks from "./HowItWorks";
import LandingPageSection from "./LandingPageSection";
import images from "./../images";
import UploadAndPrintButton from "./UploadAndPrintButton";

const SeeHowItWorksButtonMainSection = () => (
  <HashLink to='/#how-it-works' className="button button-outline">See How It Works &darr;</HashLink>
)

const UploadAndPrintButtonMainSection = () => (
  <UploadAndPrintButton className="button button--pink button-text--medium" />
)
const GoToPricingPageElement = () => (
  <Link to="/pricing" className="button button-outline button-text--medium">
    Check out our Pricing
  </Link>
);
const ContactUsButton = () => (
  <a href="mailto:contact@printngo.ca" className="button button-outline button-outline--navy button-text--medium">
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
          "Don't have access to a working printer? We got you covered! <br />Print n' go is the <strong class='text-pink h4'>quickest</strong>, <strong class='text-pink h4'>closest</strong>, and <strong class='text-pink h4'>most convenient</strong> way to print documents out there! <br/><br />Beside being all that, we are <strong class='text-pink h4'>privacy oriented</strong> and provide a <strong class='text-pink h4'>secure payment system</strong> so you never need coins for printing documents again!",
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
          "How? Our pick up locations are your favourite convenient stores, pharmacies and any kind of shop that has a printing machine.",
        imgSrc: images.pinpoint,
        imgAlt: "Closest printing service icon",
        bgColour: "bg-grapefruit",
        reverse: true
      },
      {
        title: "The quickest process and simplest way for printing documents",
        description:
          "We suppress the need of commuting to the nearest library, carrying digital documents on an USB key and accessing a computer to start the printing.",
        imgSrc: images.runningMan,
        imgAlt: "Quickest printing service icon",
        bgColour: "bg-green",
        reverse: false
      },
      {
        title: "We are privacy and confidentiality oriented",
        description:
          "Your privacy is the most important for us. We will provide you with a secret code so that only you can access and trigger the print of your documents. <br /></br />Our partners, at the pick up location, will never be able to print your documents without that secret code. <br /><br />Moreover, Because we suppress the need of carrying USB keys, sending documents via email or downloading documents in an unknown computer at the library, our service is naturally privacy oriented.",
        imgSrc: images.lock,
        imgAlt: "privacy oriented icon",
        bgColour: "bg-dark-grey",
        reverse: false
      },
      {
        title: "No need to have coins anymore",
        description:
          "Simply pay online before hand with our secure payment system.",
        imgSrc: images.debitCard,
        imgAlt: "no more coins icon",
        bgColour: "bg-mustard",
        reverse: true
      },
      {
        title: "A service that is always quicker",
        description:
          "Once you have uploaded your documents once, we will save them on your account so that you can print them even quicker next time. <br /> <br /> And if you want to be even quicker, top up your wallet with our amazing top up deals and skip the need of providing your card details each time.",
        imgSrc: images.hourglass,
        imgAlt: "Printing service always quicker icon",
        bgColour: "bg-blue-sky",
        reverse: true
      },
      {
        title: "Best value",
        description: `Our service is awesome, it doesn't mean it should be more expensive! We provide you with the best printing service at the best price.`,
        imgSrc: images.moneyBag,
        imgAlt: "Best printing service at best price icon",
        bgColour: "bg-christmas-tree",
        reverse: false,
        CallToActionButton: GoToPricingPageElement
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
        CallToActionButton: ContactUsButton,
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
