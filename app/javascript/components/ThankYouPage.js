import React from "react"
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import OrderLayout from "./OrderLayout";
import images from './../images';
import { startSetOrder } from './../actions/orders';
import Loader from "./App";

class ThankYouPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetOrder } = this.props;
    startSetOrder(this.props.match.params.id).then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  render () {
    if(this.state.loadingData) {
      return (
        <Loader />
      )
    } else {
      const { partner, order } = this.props;
      const { user, invoice } = order;
      const { firstname } = user;
      const { name, address, city, postcode, opening_hours, lat, lng } = partner;
      const currentState = 4;
  
      return (
        <OrderLayout
          currentState={currentState}
        >
          <div className="content-container border border-color--grey h5 flex justify-content--center">
            <div className="my2">
              <div className="center">
                <img src={images.success} alt="Success Icon" width={100}/>
              </div>
              <h1 className="h4 center">Payment Success! Order #{order.id}</h1>
              <div>
                <p>A big thank you for your purchase { firstname }. Your secret code for picking up your order is <strong>{order.secret_code}</strong>. </p>
                <p>Please provide this code at the pick up location.</p> 
                <p>You can now gather your documents at the following address:</p>
                <div className="p1 border border-color--grey">
                  <p>
                    {`${name} - ${address}, ${city} ${postcode}.`}
                  </p>
                  <p>{`Opening hours: ${opening_hours}`}</p>
                  <a className="text-navy" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>Find the best way to get there</a>
                </div>


                <p></p>
                <p className="m0"><i>As we care about your privacy: <br /><strong>If you are unable to provide the secret code, please note that a proof of ID will be required for gathering your order.</strong></i></p>
              </div>
              <div className="flex justify-content--between">
                <Link className="mt3 button button-outline--pink" to={`/order/${this.props.match.params.id}`}>See Order</Link>
                <Link className="mt3 button button-outline--pink" target="_blank" to={`/invoice/${invoice.id}`}>Download Invoice</Link>
              </div>
            </div>
          </div>
        </OrderLayout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  partner: state.order.partner,
  order: state.order
})

const mapDispatchToProps = (dispatch) => ({
  startSetOrder: (id) => dispatch(startSetOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThankYouPage))
