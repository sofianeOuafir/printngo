import React from "react"

import images from './../images';
import Circle from './Circle';

class HowItWorks extends React.Component {
  render () {
    const steps = [{
      src: images.upload,
      alt: "Upload Icon",
      width: 200,
      title: "Upload",
      number: 1
    }, {
      src: images.map,
      alt: "Pick Up Location Icon",
      width: 200,
      title: "Select pick up location",
      number: 2
    }, {
      src: images.creditCard,
      alt: "Pick Up Location Icon",
      width: 200,
      title: "Make Payment",
      number: 3
    }, {
      src: images.file,
      alt: "Gather Documents Icon",
      width: 200,
      title: "Gather your documents",
      number: 4
    }]
    return (
      <div className={`bg-orange fullscreen border--bottom border-color--white justify-content--center text-white flex align-items--center`}>
        <div className="content-container">
          <h1 className="m0 h2 favourite-font-weight mb3 center">How It Works?</h1>
          <div className="flex justify-content--around center">
            { steps.map((step, index) => (
              <div key={index} className="mr1">
                <Circle number={step.number} />
                <img src={step.src} alt={step.alt} width={step.width}/>
                <h2 className="h3">{ step.title }</h2>
              </div>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks
