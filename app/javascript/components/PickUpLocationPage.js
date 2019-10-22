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
      defaultMapZoom: 12,
      loadingData: true,
      mapCenter: torontoLocation,
      highlightedPartner: null,
      sortingData: false,
      sortingError: '',
      sortingMessage: 'Loading... Please wait.'
    }
  }

  componentDidMount() {
    const { startSetOrder, startSetPartners } = this.props;
    Promise.all([startSetOrder(), startSetPartners()]).then((response) => {
      const order = response[0].data;
      const { partner } = order;
      const mapCenter = partner ? { lat: partner.lat, lng: partner.lng } : this.state.mapCenter;
      this.setState(() => ({ loadingData: false, mapCenter, highlightedPartner: partner }))

    })
  }

  onLocationSelect = (partnerId) => {
    this.props.startUpdateOrder({ partner_id: partnerId }).then(() => {
      this.props.history.push('/order/payment');
    })
  }

  onPartnerMouseEnter = (partner) => {
    this.setState((prevState) => ({ ...prevState, mapCenter: { lat: partner.lat, lng: partner.lng }, highlightedPartner: partner }))
  }

  onPartnerMouseLeave = () => {
    const { order } = this.props;
    const { partner } = order;
    if (partner) {
      const { lat, lng } = partner;
      this.setState((prevState) => ({ ...prevState, mapCenter: { lat, lng }, highlightedPartner: partner }))
    } else {
      this.setState((prevState) => ({ ...prevState, highlightedPartner: null }))
    }
  }

  onFindClosest = () => {
    const { startSetPartners } = this.props;
    this.setState(() => ({ sortingData: true }), () => {
      new Promise((resolve, reject) => {
        if(navigator.geolocation) {
          this.setState(() => ({ sortingMessage: 'Please enable geolocation so we can find the closest printing machine for you!' }), () => {
            navigator.geolocation.getCurrentPosition((data) => {
              this.setState(() => ({ sortingMessage: 'Loading... Please wait.' }), () => {
                const { latitude: lat, longitude: lng } = data.coords;
                startSetPartners({ lat, lng }).then(() => {
                  resolve()
                })
              })
            }, () => {
              reject('Geolocation is not enabled. Please enable Geolocation and try again.')
            })
          })
        } else {
          reject('Geolocation is not supported by this browser.')
        }
      }).then(() => {
        this.setState(() => ({ sortingData: false }));
      }).catch((e) => {
        this.setState(() => ({ sortingData: false, sortingError: e} ));
      })
    });
  }

  render () {
    const { 
      loadingData, 
      sortingData, 
      sortingMessage, 
      sortingError, 
      mapCenter,
      highlightedPartner,
      defaultMapZoom
    } = this.state;

    if(loadingData) {
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
              <a className="button button-outline--pink button--no-border-radius mb1" onClick={this.onFindClosest}>Sort from Closest to Furthest</a>
              {sortingError && <p className="h5 m0 mb1 text-pink">{sortingError}</p>}
              { sortingData ? (
                <p className="h5 m0 mb1 text-navy">{sortingMessage}</p>
              ) : (
                partners.map((partner, index) => (
                  <div onMouseLeave={this.onPartnerMouseLeave} onMouseEnter={() => this.onPartnerMouseEnter(partner)} key={index} className={`${order.partner_id === partner.id ? 'bg-navy text-white' : ''} pointer mb2 flex justify-content--between p2 border border-color--grey flex align-items--center`}>
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
                ))
              ) }
            </div>
            <div className="col-4 pl1">
              <MapElement defaultZoom={defaultMapZoom} defaultMapCenter={mapCenter} center={mapCenter} data={partners} highlightedElement={highlightedPartner} />
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
  startSetPartners: (position) => dispatch(startSetPartners(position))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PickUpLocationPage));
