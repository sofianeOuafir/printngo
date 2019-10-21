import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MapElement from "./MapElement";
import OrderLayout from "./OrderLayout";
import { startUpdateOrder, startSetOrder } from './../actions/orders';
import { startSetPartners } from './../actions/partners';
import Loader from "./Loader";

class PickUpLocationPage extends React.Component {
  constructor(props) {
    super(props);
    const torontoLocation = {
      lat: 43.6425662, lng: -79.3892455
    }
    this.state = {
      loadingData: true,
      mapCenter: torontoLocation
    }
  }

  componentDidMount() {
    const { startSetOrder, startSetPartners } = this.props;
    Promise.all([startSetOrder(), startSetPartners()]).then((response) => {
      const order = response[0].data;
      const { partner } = order;
      const mapCenter = partner ? { lat: partner.lat, lng: partner.lng } : this.state.mapCenter;
      this.setState(() => ({ loadingData: false, mapCenter }))
    })
  }

  onLocationSelect = (partnerId) => {
    this.props.startUpdateOrder({ partner_id: partnerId }).then(() => {
      this.props.history.push('/order/payment');
    })
  }

  onPartnerHover = (partner) => {
    this.setState((prevState) => ({ ...prevState, mapCenter: { lat: partner.lat, lng: partner.lng } }))
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
          <div className="content-container flex">
            <div className="col-8">
              { partners.map((partner, index) => (
                <div onMouseOver={() => this.onPartnerHover(partner)} key={index} className={`${order.partner_id === partner.id ? 'bg-navy text-white' : ''} mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`}>
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
            <div className="col-4 pl1">
              <MapElement defaultMapCenter={this.state.mapCenter} center={this.state.mapCenter} positions={partners.map(({ lat, lng }) => ({lat, lng}))} />
            </div>
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
