import React from "react";

import images from "./../images";

class HowItWorks extends React.Component {
  render() {
    const steps = [
      {
        src: images.upload,
        alt: "Upload Icon",
        title: "Upload your documents",
        number: 1
      },
      {
        src: images.map,
        alt: "Pick Up Location Icon",
        title: "Select a pick up location",
        number: 2
      },
      {
        src: images.creditCard,
        alt: "Pick Up Location Icon",
        title: "Make a secure payment and get a secret code",
        number: 3
      },
      {
        src: images.file,
        alt: "Gather Documents Icon",
        title:
          "Provide the secret code at the pick up location and gather your documents",
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
              How It Works?
            </p>
            <div className="flex how-it-works-steps-container justify-content--around">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="how-it-works-step flex col-3 center align-items--center flex-direction--column px1"
                >
                  <span className="step-number h3">
                    {step.number}
                  </span>
                  <img src={step.src} alt={step.alt} width={140} />
                  <span className="mt1 title h4">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
