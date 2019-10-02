import React from "react"
import OrderLayout from "./OrderLayout";
import { connect } from 'react-redux';

class ThankYouPage extends React.Component {
  render () {
    const { partner } = this.props;
    const { name, address, city, postcode, opening_hours } = partner;
    const currentState = 4;
    return (
      <OrderLayout
        currentState={currentState}
      >
        <div className="content-container h4">
          <h1>Payment Sucess</h1>
          <div>
            <p>Thank you Sofiane. You can now go gather your documents at:</p>
            <p>{`${name} - ${address}, ${city} ${postcode}`}</p>
            <p>{`Opening hours: ${opening_hours}`}</p>
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
