import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MapElement from "./MapElement";
import OrderLayout from "./OrderLayout";
import { startUpdateOrder, startSetOrder } from './../actions/orders';
import { startSetPartners } from './../actions/partners';
import Loader from "./Loader";
import Partner from './Partner';

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
      permissionStatus: '',
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
          navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            this.setState(() => ({ permissionStatus: permissionStatus.state }))
          }).then(() => {
            navigator.geolocation.getCurrentPosition((data) => {
              const { latitude: lat, longitude: lng } = data.coords;
              startSetPartners({ lat, lng }).then(() => {
                resolve()
              })
            }, () => {
              reject('Geolocation is not enabled. Please enable Geolocation and try again.')
            }, { enableHighAccuracy: true, timeout: 10000 })
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
      sortingError, 
      mapCenter,
      highlightedPartner,
      defaultMapZoom,
      permissionStatus
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
          <div className="content-container flex flex-direction--column">
            <div>
              <a className="button button-outline--navy button--no-border-radius mb1" onClick={this.onFindClosest}>Sort from Closest to Furthest</a>
            </div>
            <div className="flex">
              <div className="col-8">
                {sortingError && <p className="h5 m0 mb1 text-pink">{sortingError}</p>}
                { sortingData ? (
                  permissionStatus && <p className="h5 m0 mb1 text-navy">{permissionStatus == 'granted' ? 'Loading... Please wait.' : 'Please enable geolocation so we can find the nearest printing machine for you!' }</p>
                ) : (
                  partners.map((partner, index) => (
                    <Partner 
                      highlighted={highlightedPartner && partner.id === highlightedPartner.id }
                      readOnly={false}
                      onLocationSelect={() => this.onLocationSelect(partner.id)} 
                      partner={partner} 
                      order={order} 
                      onMouseLeave={this.onPartnerMouseLeave} 
                      onMouseEnter={() => this.onPartnerMouseEnter(partner)} 
                      key={index} 
                    />
                  ))
                ) }
              </div>
              <div className="col-4 pl1 sticky sticky--map" style={{ height: '400px' }}>
                <MapElement defaultZoom={defaultMapZoom} defaultMapCenter={mapCenter} center={mapCenter} data={partners} highlightedElement={highlightedPartner} />
              </div>
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
