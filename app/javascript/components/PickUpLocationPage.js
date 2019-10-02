import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import OrderLayout from "./OrderLayout";
import { startUpdateOrder } from './../actions/orders';

class PickUpLocationPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onLocationSelect = (partnerId) => {
    this.props.startUpdateOrder({ partner_id: partnerId }).then(() => {
      this.props.history.push('/order/payment');
    })
  }

  render () {
    const { partners, order } = this.props;
    const currentState = 2;
    return (
      <OrderLayout
        currentState={currentState}
        title="Select Pick Up Location"
        nextButton={{ link: '/order/payment', text: 'Go to Payment', disabled: order.partner_id == null }} 
      >
        <div className="content-container">
          { partners.map((partner, index) => (
            <div key={index} className={`${order.partner_id === partner.id ? 'bg-navy text-white' : ''} mb2 flex justify-content--between p2 border flex align-items--center`}>
              <div className="flex h5">
                <div className="flex flex-direction--column">
                  <span>{partner.name}</span>
                  <span>{partner.address}</span>
                  <span>{partner.city}</span>
                  <span>{partner.postcode}</span>
                </div>
                <span>{partner.opening_hours}</span>
              </div>
              <div>
                <a className={`button pointer ${order.partner_id === partner.id ? 'button-outline' : 'button--navy'}`} onClick={() => this.onLocationSelect(partner.id)}>Select</a>
              </div>
            </div>
          )) }
        </div>


        <div className={`content-container my3`}>
          <Link className="button button-outline--pink" to="/order/basket">&larr; Go back to Basket</Link>
        </div>
      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  partners: state.partners,
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  startUpdateOrder: (updates) => dispatch(startUpdateOrder(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PickUpLocationPage));
