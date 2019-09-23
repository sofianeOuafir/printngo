import React from "react"
import PropTypes from "prop-types"

import images from './../images';

class HowItWorks extends React.Component {
  render () {
    return (
      <div className={`bg-orange fullscreen border--bottom border-color--white justify-content--center align-items--center text-white flex`}>
        <h1 className="m0 h2 favourite-font-weight">How It Works?</h1>
        <div>
          <img src={images.upload} alt="Upload Icon" width={350}/>
          <img src={images.map} alt="Pick Up Location Icon" width={350}/>
          <img src={images.creditCard} alt="Make Payment Icon" width={350}/>
          <img src={images.file} alt="Gather Documents Icon" width={350}/>
        </div>
      </div>
    );
  }
}

export default HowItWorks
