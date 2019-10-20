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
              <h1 className="h4 center">Payment Sucess!</h1>
              <div>
                <p>A big thank you for your purchase { firstname }. Your order number is #{order.id}.</p>
                <p>You can now gather your documents at the following address:</p>
                <p>
                  {`${name} - ${address}, ${city} ${postcode}.`} <br/> <a className="text-navy" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>Find the best way to get there</a>
                </p>
                <p>{`Opening hours: ${opening_hours}`}</p>
                <p className="m0"><strong>Because we care about your privacy, please note that a proof of ID might be required for gathering your order.</strong></p>
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
