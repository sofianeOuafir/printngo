import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import OrderLayout from "./OrderLayout";
import { startUpdateOrder, startSetOrder } from './../actions/orders';
import { startSetPartners } from './../actions/partners';
import Loader from "./Loader";

class PickUpLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetOrder, startSetPartners } = this.props;
    Promise.all([startSetOrder(), startSetPartners()]).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  onLocationSelect = (partnerId) => {
    this.props.startUpdateOrder({ partner_id: partnerId }).then(() => {
      this.props.history.push('/order/payment');
    })
  }

  render () {
    if(this.state.loadingData) {
      return (
        <Loader/>
      )
    } else {
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
              <div key={index} className={`${order.partner_id === partner.id ? 'bg-navy text-white' : ''} mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`}>
                <div className="flex h5">
                  <div className="flex flex-direction--column mr2">
                    <span>{partner.name}</span>
                    <span>{partner.address}</span>
                    <span>{partner.city}</span>
                    <span>{partner.postcode}</span>
                  </div>
                  <span>Opening Hours: {partner.opening_hours}</span>
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
}

const mapStateToProps = (state) => ({
  partners: state.partners,
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  startUpdateOrder: (updates) => dispatch(startUpdateOrder(updates)),
  startSetOrder: () => dispatch(startSetOrder()),
  startSetPartners: () => dispatch(startSetPartners())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PickUpLocationPage));
