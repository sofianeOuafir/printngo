import React from "react";
import ReactHtmlParser from "react-html-parser";

const LandingPageSection = ({
  id = null,
  color = "text-white",
  title,
  description = null,
  CallToActionButton = null,
  SecondCallToActionButton = null,
  imgSrc,
  imgAlt,
  bgColour,
  reverse = false
}) => {
  return (
    <div>
      <a id={id}></a>
      <div
        className={`${bgColour} fullscreen border--bottom border-color--white align-items--center ${color} flex`}
      >
        <div
          className={`content-container flex align-items--center justify-content--center ${
            reverse ? "flex-direction--row-reverse" : null
          }`}
        >
          <div
            className={`landing-page-section--left ${
              reverse ? "ml3" : "mr3"
            }`}
          >
            <span className="m0 h3 favourite-font-weight">
              {ReactHtmlParser(title)}
            </span>
            {CallToActionButton ? (
              <div className="py1 call-to-action">
                <CallToActionButton className="px0 fullwidth button button-outline" />
              </div>
            ) : null}

            {description && (
              <p
                className="favourite-font-weight"
                style={{ fontSize: "1.4rem" }}
              >
                {ReactHtmlParser(description)}
              </p>
            )}
            {SecondCallToActionButton ? (
              <div>
                <SecondCallToActionButton className="second-call-to-action button button-outline" />
              </div>
            ) : null}
          </div>

          <div className="landing-page-section--right flex flex-direction--column center">
            {CallToActionButton ? (
              <div className="mb3">
                <CallToActionButton className="button button-outline button-text--medium" />
              </div>
            ) : null}
            <img src={imgSrc} alt={imgAlt} width={"72%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSection;
