import React from "react"

import Layout from './Layout';
import LandingPageSection from './LandingPageSection';
import images from './../images';

class PartnerPage extends React.Component {
  render () {
    const sections = [{
      title: "Become a Print n' Go partner, earn money and grow your business", 
      description: "By providing the quickest and most convenient printing service, you will get paid while attracting more people in your selling point without impacting your main activity.",
      imgSrc: images.handShake,
      imgAlt: "Become Partner Icon",
      bgColour: 'bg-orange',
      reverse: false
    }, {
      title: "Create a new source of revenue", 
      description: "You will get paid for every single document printed.", 
      imgSrc: images.money,
      imgAlt: "New Source Revenue Icon",
      bgColour: 'bg-grapefruit',
      reverse: true,
    }, {
      title: "Attract new customers in your shop and grow your sells",
      description: "You will attract some people that might never have heard of you or come to your shop before. It will be an opportunity for them to discover you maybe buy your products or services one day.",
      imgSrc: images.attract,
      imgAlt: "Attract new customers Icon",
      bgColour: 'bg-blue-sky',
      reverse: false
    }, {
      title: "It is hassle free and won't impact your business",
      description: "All you have to do is pressing the printing button and handling the documents to the customers after a verification of ID.",
      imgSrc: images.yoga,
      imgAlt: "Hassle free Icon",
      bgColour: 'bg-navy',
      reverse: true
    }, {
      title: "Reinforce your relationship with your existing customers", 
      description: "By providing the best printing service, your existing customers will have one more reason for you to be their favourite shop!",
      imgSrc: images.exercise,
      imgAlt: "Reinforce relationship Icon",
      bgColour: 'bg-dark-grey',
      reverse: false
    }, {
      title: "Get free promotion",
      description: "Because you will be listed as a pick up location on our website, it will be an opportunity for our customers to get to know you and go to your selling point for the first time.",
      imgSrc: images.shout,
      imgAlt: "Get free promotion Icon",
      bgColour: 'bg-christmas-tree',
      reverse: true
    }];
    return (
      <Layout>
        { sections.map((section, index) => (
          <LandingPageSection 
            key={index}
            {...section}
          />
        )) }
      </Layout>
    );
  }
}
export default PartnerPage
