import React from "react"
import PropTypes from "prop-types"

class LandingPageSection extends React.Component {
  render () {
    const { id = null, title, description = null, CallToActionButton = null, imgSrc, imgAlt, bgColour, reverse = false } = this.props;
    return (
      <div id={id} className={`${bgColour} content-container fullscreen border--bottom border-color--white justify-content--center align-items--center text-white flex`}>
        <div className={`flex justify-content--center ${reverse ? 'flex-direction--row-reverse' : null}`}>
          <div className={`${reverse ? 'ml3' : 'mr3'}`} style={{ width: '55%' }}>
            <h1 className="m0 h2 favourite-font-weight">{title}</h1>
            {description && <p className="h4">{description}</p>}
          </div>
          <div className="flex flex-direction--column center">
            { CallToActionButton ? (
              <div className="mb3">
                <CallToActionButton />
              </div>
            ) : null }
            <img src={imgSrc} alt={imgAlt} width={350} />
          </div>    
        </div>
 
      </div>
    );
  }
}

export default LandingPageSection
