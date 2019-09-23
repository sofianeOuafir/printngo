import React from "react"
import PropTypes from "prop-types"

class LandingPageSection extends React.Component {
  render () {
    const { title, description = null, callToActionButton = null, imgSrc, imgAlt, bgColour, reverse = false } = this.props;
    return (
      <div className={`${bgColour} fullscreen border--bottom border-color--white justify-content--center align-items--center text-white flex`}>
        <div className={`flex justify-content--center ${reverse ? 'flex-direction--row-reverse' : null}`}>
          <div className={`${reverse ? 'ml3' : 'mr3'}`} style={{ width: '55%' }}>
            <h1 className="m0 h2 favourite-font-weight">{title}</h1>
            {description && <p className="h4">{description}</p>}
          </div>
          <div>
            { callToActionButton ? callToActionButton : null }
            <img src={imgSrc} alt={imgAlt} width={350} />
          </div>    
        </div>
 
      </div>
    );
  }
}

export default LandingPageSection
