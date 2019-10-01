import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import OrderLayout from "./OrderLayout";
import { setPartners } from './../actions/partners';
import { setOrder, startUpdateOrder } from './../actions/orders';

class PickUpLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPage: false
    }
  }
  componentDidMount() {
    Promise.all([axios.get('/api/v1/partners'), axios.get('/api/v1/orders/undefined')]).then(([responsePartners, responseOrder]) => {
      this.props.setPartners(responsePartners.data)
      this.props.setOrder(responseOrder.data);
      this.setState(() => ({renderPage: true}) )
    })
  }

  onLocationSelect = (partnerId) => {
    this.props.startUpdateOrder({ partner_id: partnerId }).then(() => {
      this.props.history.push('/payment');
    })
  }

  render () {
    const { renderPage } = this.state;
    const { partners, order } = this.props;
    return (
      <OrderLayout
        renderPage={renderPage}
        title="Select Pick Up Location"
        nextButton={{ link: '/payment', text: 'Go to Payment', disabled: order.partner_id == null }} 
      >
        <div className="content-container">
          { partners.map((partner, index) => (
            <div key={index} className={`${order.partner_id === partner.id ? 'bg-navy text-white' : ''} mb2 flex justify-content--between p2 border flex align-items--center`}>
              <div className="flex h4">
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
          <Link className="button button-outline--pink" to="/basket">&larr; Go back to Basket</Link>
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
  setPartners: (partners) => dispatch(setPartners(partners)),
  setOrder: (order) => dispatch(setOrder(order)),
  startUpdateOrder: (updates) => dispatch(startUpdateOrder(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PickUpLocationPage));
