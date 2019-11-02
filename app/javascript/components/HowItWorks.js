import React from "react"

import images from './../images';
import Circle from './Circle';

class HowItWorks extends React.Component {
  render () {
    const steps = [{
      src: images.upload,
      alt: "Upload Icon",
      width: 180,
      title: "Upload your documents",
      number: 1
    }, {
      src: images.map,
      alt: "Pick Up Location Icon",
      width: 180,
      title: "Select a pick up location",
      number: 2
    }, {
      src: images.creditCard,
      alt: "Pick Up Location Icon",
      width: 180,
      title: "Make a secure payment and get a secret code",
      number: 3
    }, {
      src: images.file,
      alt: "Gather Documents Icon",
      width: 180,
      title: "Provide the secret code at the selected location and gather your documents",
      number: 4
    }]
    return (
      <div id="how-it-works" className={`bg-orange fullscreen border--bottom border-color--white justify-content--center text-white flex align-items--center`}>
        <div className="content-container">
          <h1 className="m0 h2 favourite-font-weight mb3 center">How It Works?</h1>
          <div className="flex justify-content--around">
            { steps.map((step, index) => (
              <div key={index} className="flex col-3 center align-items--center flex-direction--column px1">
                <Circle number={step.number} />
                <img src={step.src} alt={step.alt} width={step.width}/>
                <h2 className="h4">{ step.title }</h2>
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks
