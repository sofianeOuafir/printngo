import React from "react";
import { withTranslation } from "react-i18next";

import images from "./../images";

const HowItWorks = ({ t }) => {
  const steps = [
    {
      src: images.upload,
      alt: "Upload Icon",
      title: t("home.howItWorks.step1"),
      number: 1
    },
    {
      src: images.map,
      alt: "Pick Up Location Icon",
      title: t("home.howItWorks.step2"),
      number: 2
    },
    {
      src: images.creditCard,
      alt: "Pick Up Location Icon",
      title: t("home.howItWorks.step3"),
      number: 3
    },
    {
      src: images.file,
      alt: "Gather Documents Icon",
      title: t("home.howItWorks.step4"),
      number: 4
    }
  ];
  return (
    <div>
      <a id="how-it-works"></a>
      <div
        className={`bg-orange fullscreen border--bottom border-color--white justify-content--center text-white flex flex-direction--column align-items--center`}
      >
        <div className="how-it-works content-container">
          <p className="title fullwidth m0 h3 favourite-font-weight mb3 center">
            {t("home.howItWorks.title")}
          </p>
          <div className="flex how-it-works-steps-container justify-content--around">
            {steps.map((step, index) => (
              <div
                key={index}
                className="how-it-works-step flex col-3 center align-items--center flex-direction--column px1"
              >
                <span className="step-number h3">{step.number}</span>
                <img src={step.src} alt={step.alt} width={140} />
                <span className="mt1 title h4">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(HowItWorks);
