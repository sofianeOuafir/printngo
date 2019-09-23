import React from "react"
import PropTypes from "prop-types"

class LandingPageSection extends React.Component {
  render () {
    const { title, description = null, callToActionButton = null, imgSrc, imgAlt, bgColour } = this.props;
    return (
      <div className={`${bgColour} text-white`}>
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <div>
          { callToActionButton ? callToActionButton : null }
          <img src={imgSrc} alt={imgAlt} />
        </div>     
      </div>
    );
  }
}

export default LandingPageSection
