import React, { Fragment } from "react";

import HowItWorks from "./HowItWorks";
import LandingPageSection from "./LandingPageSection";
import Layout from "./Layout";
import images from "./../images";
import UploadAndPrintButton from "./UploadAndPrintButton";

class HomePage extends React.Component {
  render() {
    const sections = [
      {
        title:
          "Upload your documents, <br /> Choose your closest pick up location, Print n' Go",
        description:
          "Don't have access to a working printer? We got you covered! <br />Print n' go is the <strong class='text-pink h4'>quickest</strong>, <strong class='text-pink h4'>closest</strong>, and <strong class='text-pink h4'>most convenient</strong> way to print documents out there! <br/><br />Beside being all that, we are <strong class='text-pink h4'>privacy oriented</strong> and provide a <strong class='text-pink h4'>secure payment system</strong> so you never need coins for printing documents again! <br /><br />Printing documents has never been <strong class='text-pink h4'>so convenient</strong>.",
        imgSrc: images.printer,
        imgAlt: "Printer Icon",
        bgColour: "bg-navy",
        reverse: false,
        CallToActionButton: UploadAndPrintButton
      },
      {
        id: "why-print-n-go",
        title: "We are the closest printing service near you",
        description:
          "How? Our pick up locations are your favourite convenient stores, pharmacies and any kind of shops that has a printing machine.",
        imgSrc: images.pinpoint,
        imgAlt: "Closest printing service icon",
        bgColour: "bg-grapefruit",
        reverse: true
      },
      {
        title: "The quickest process and simplest way for printing documents",
        description:
          "We suppress the need of both commuting and accessing a computer.",
        imgSrc: images.runningMan,
        imgAlt: "Quickest printing service icon",
        bgColour: "bg-green",
        reverse: false
      },
      {
        title: "No need to have coins anymore",
        description: "Simply pay online with our secure payment system.",
        imgSrc: images.debitCard,
        imgAlt: "no more coins icon",
        bgColour: "bg-mustard",
        reverse: true
      },
      {
        title: "We are privacy and confidentiality oriented",
        description:
          "Because we suppress the need of carrying USB keys, sending documents via email or downloading documents in an unknown computer at the library, our service is naturally privacy oriented.",
        imgSrc: images.lock,
        imgAlt: "privacy oriented icon",
        bgColour: "bg-dark-grey",
        reverse: false
      },
      {
        title: "A service that is always quicker",
        description:
          "Once you have uploaded your documents once, we will save them on your account so that you can print them even quicker next time.",
        imgSrc: images.hourglass,
        imgAlt: "Printing service always quicker icon",
        bgColour: "bg-blue-sky",
        reverse: true
      },
      {
        id: "pricing",
        title: "Pricing - Best value",
        description:
          "Our service is awesome, it doesn't mean it should be more expensive! We provide you with the best printing service at the best price: $0.20 for black & white and $0.50 for colour.",
        imgSrc: images.moneyBag,
        imgAlt: "Best printing service at best price icon",
        bgColour: "bg-christmas-tree",
        reverse: false
      },
      {
        id: "contact-us",
        title: "We love hearing from you",
        description:
          "Have questions or feedback? You can contact us anytime at contact@printngo.ca",
        imgSrc: images.contact,
        imgAlt: "Contact Us",
        bgColour: "bg-white",
        color: "text-navy",
        reverse: true
      }
    ];
    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default HomePage;
