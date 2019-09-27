import React from "react"

import OrderLayout from "./OrderLayout";

class PickUpLocationPage extends React.Component {
  render () {
    return (
      <OrderLayout 
        title="Select Pick Up Location" 
        nextButtonLink="/payment" 
        nextButtonText="Payment"
        prevButtonLink="/basket" 
        prevButtonText="Basket"
      >
      </OrderLayout>
    );
  }
}

export default PickUpLocationPage
