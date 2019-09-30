import React from "react"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import OrderLayout from "./OrderLayout";
import { setPartners } from './../actions/partners';

class PickUpLocationPage extends React.Component {
  componentDidMount() {
    axios.get('/api/v1/partners').then(response => {
      this.props.setPartners(response.data)
    });
  }
  render () {
    const { partners, order } = this.props;
    return (
      <OrderLayout 
        title="Select Pick Up Location"
        nextButton={{ link: '/payment', text: 'Go to Payment', disabled: order.partner_id == null }} 
      >
        <div className="content-container">
          { partners.map((partner, index) => (
            <div className="border flex h4" key={index}>
              <div className="flex flex-direction--column">
                <span>{partner.name}</span>
                <span>{partner.address}</span>
                <span>{partner.city}</span>
                <span>{partner.postcode}</span>
              </div>

              <span>{partner.opening_hours}</span>
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
  setPartners: (partners) => dispatch(setPartners(partners))
})

export default connect(mapStateToProps, mapDispatchToProps)(PickUpLocationPage);
