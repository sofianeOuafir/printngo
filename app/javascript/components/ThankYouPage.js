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
      const { name, address, city, postcode, opening_hours } = partner;
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
                <p>Thank you { firstname }. You can now go gather your documents at:</p>
                <p>{`${name} - ${address}, ${city} ${postcode}.`}</p>
                <p>{`Opening hours: ${opening_hours}`}</p>
                <p><strong>Important: Please bring a proof of ID with you.</strong></p>
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
