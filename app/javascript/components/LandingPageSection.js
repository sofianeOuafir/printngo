import React from "react";
import ReactHtmlParser from "react-html-parser";

class LandingPageSection extends React.Component {
  render() {
    const {
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
    } = this.props;
    return (
      <div>
        <a id={id}></a>
        <div
          className={`${bgColour} fullscreen border--bottom border-color--white align-items--center ${color} flex`}
        >
          <div
            className={`content-container flex justify-content--center ${
              reverse ? "flex-direction--row-reverse" : null
            }`}
          >
            <div
              className={`${reverse ? "ml3" : "mr3"}`}
              style={{ width: "60%" }}
            >
              <h1 className="m0 h3 favourite-font-weight">
                <strong>{ReactHtmlParser(title)}</strong>
              </h1>
              {description && (
                <p className="favourite-font-weight h4">
                  {ReactHtmlParser(description)}
                </p>
              )}
              {SecondCallToActionButton ? <SecondCallToActionButton /> : null}
            </div>
            <div className="flex flex-direction--column center">
              {CallToActionButton ? (
                <div className="mb3">
                  <CallToActionButton className="button button-outline button-text--medium" />
                </div>
              ) : null}
              <img src={imgSrc} alt={imgAlt} width={330} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPageSection;
