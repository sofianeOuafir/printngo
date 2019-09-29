import React from "react"
import { Link } from 'react-router-dom';

import OrderLayout from "./OrderLayout";

class PickUpLocationPage extends React.Component {
  render () {
    return (
      <OrderLayout 
        title="Select Pick Up Location"
        nextButton={{ link: '/payment', text: 'Go to Payment' }} 
      >
      <div className={`content-container my3`}>
        <Link className="button button-outline--pink" to="/basket">&larr; Go back to Basket</Link>
      </div>
      </OrderLayout>
    );
  }
}

export default PickUpLocationPage
