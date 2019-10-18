import React, { Fragment } from "react"

import HowItWorks from './HowItWorks';
import LandingPageSection from './LandingPageSection';
import Layout from './Layout';
import images from './../images';
import UploadAndPrintButton from './UploadAndPrintButton';

class HomePage extends React.Component {
  render () {
    const sections = [{
      title: "Upload documents, Choose your closest pick up point, Print n' Go", 
      description: "Printing documents has never been so convenient.",
      imgSrc: images.printer,
      imgAlt: "Printer Icon",
      bgColour: 'bg-navy',
      reverse: false,
      CallToActionButton: UploadAndPrintButton
    }, {
      id: 'why-print-n-go',
      title: "We are the closest printing service near you", 
      description: "How? Our partners are your favourite convenient stores, pharmacies and any kind of shops that has a printing machine.",
      imgSrc: images.pinpoint,
      imgAlt: "Closest printing service icon",
      bgColour: 'bg-grapefruit',
      reverse: true
    }, {
      title: "The quickest process and simplest way for printing documents", 
      description: "Just go to your favourite pick up point and gather your documents without the need of having access to a computer or carrying your digital files with you.", 
      imgSrc: images.runningMan,
      imgAlt: "Quickest printing service icon",
      bgColour: 'bg-green',
      reverse: false
    }, {
      title: "No need to have coins anymore, Simply pay online with our secure payment system",
      imgSrc: images.debitCard,
      imgAlt: "no more coins icon",
      bgColour: 'bg-mustard',
      reverse: true
    }, {
      title: "We are privacy and confidentiality oriented",
      description: "Because we suppress the need of carrying USB keys, sending documents via email or downloading documents in an unknown computer at the library, our service is naturally privacy oriented.", 
      imgSrc: images.lock,
      imgAlt: "privacy oriented icon",
      bgColour: 'bg-dark-grey',
      reverse: false
    }, {
      title: "A service that is always quicker",
      description: "Once you have uploaded your documents once, we will save them on your account so that you can print them even quicker next time.", 
      imgSrc: images.hourglass,
      imgAlt: "Printing service always quicker icon",
      bgColour: 'bg-blue-sky',
      reverse: true
    }, {
      id: 'pricing',
      title: "Pricing - Best value",
      description: "Our service is awesome, it doesn't mean it should be more expensive! We provide you with the best printing service at the best price: $0.20 for black & white and $0.50 for colour.", 
      imgSrc: images.moneyBag,
      imgAlt: "Best printing service at best price icon",
      bgColour: 'bg-christmas-tree',
      reverse: false
    }]
    return (
      <Layout>
        { sections.map((section, index) => {
          if(index === 1) {
            return (
              <Fragment key={index}>
                <HowItWorks/>
                <LandingPageSection 
                  {...section}
                />
              </Fragment>
            )
          } else {
            return (
              <LandingPageSection 
                key={index}
                {...section}
              />
            )
          }
      }) }
      </Layout>
    );
  }
}

export default HomePage
