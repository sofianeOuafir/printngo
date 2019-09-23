import React from "react"

import Layout from './Layout';
import LandingPageSection from './LandingPageSection';

class PartnerPage extends React.Component {
  render () {
    return (
      <Layout>
        <LandingPageSection 
          title="Become a Print n' Go partner, earn money and grow your business" 
          description="By providing the quickest and most convenient printing service, you will get paid while attracting more people in your selling point without impacting your main activity."
        />
        <LandingPageSection 
          title="Create a new source of revenue" 
          description="You will get paid for every single document printed." 
        />
        <LandingPageSection 
          title="Attract new customers in your shop and grow your sells" 
          description="You will attract some people that might never have heard of you or come to your shop before. It will be an opportunity for them to discover you maybe buy your products or services one day." 
        />
        <LandingPageSection 
          title="It is hassle free and won't impact your business" 
          description="All you have to do is pressing the printing button and handling the documents to the customers after a verificaiton of ID." 
        />
        <LandingPageSection 
          title="Reinforce your relationship with your existing customers" 
          description="By providing the best printing service, your existing customers will have one more reason for you to be their favourite shop!" 
        />
        <LandingPageSection 
          title="Get free promotion" 
          description="Because you will be listed as a pick up location on our website, it will be an opportunity for our customers to get to know you and go to your selling point for the first time." 
        />
      </Layout>
    );
  }
}
export default PartnerPage
