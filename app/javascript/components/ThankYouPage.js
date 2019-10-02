import React from "react"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrderLayout from "./OrderLayout";
import images from './../images';

class ThankYouPage extends React.Component {
  render () {
    const { partner } = this.props;
    const { name, address, city, postcode, opening_hours } = partner;
    const currentState = 4;
    return (
      <OrderLayout
        currentState={currentState}
      >
        <div className="content-container border h5 flex justify-content--center">
          <div className="my2">
            <div className="center">
              <img src={images.success} alt="Success Icon" width={100}/>
            </div>
            <h1 className="h4 center">Payment Sucess!</h1>
            <div>
              <p>Thank you Sofiane. You can now go gather your documents at:</p>
              <p>{`${name} - ${address}, ${city} ${postcode}`}</p>
              <p>{`Opening hours: ${opening_hours}`}</p>
            </div>
            <Link className="mt3 button button-outline--pink" to="/dashboard">Go to Dashboard</Link>
          </div>
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  partner: state.order.partner
})

export default connect(mapStateToProps)(ThankYouPage)
