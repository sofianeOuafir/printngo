import React from "react"
import Layout from './Layout';
import axios from 'axios';
import { connect } from 'react-redux';

import { getDateTimeFormat } from './../utils/date';
import Loader from './Loader';
import { startSetClientOrders } from './../actions/orders';
import { fromCentsToDollars } from './../utils/money';

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetClientOrders } = this.props;
    startSetClientOrders().then(() => {
      this.setState(() => ({ loadingData: false}))
    })
  }

  render () {
    if(this.state.loadingData) {
      return (
        <Loader />
      )
    } else {
      const { clientOrders } = this.props;
      return (
        <Layout>
          <div className="content-container">
            <h1 className="h4 favourite-font-weight">Your Orders</h1>
            { clientOrders.map((order, index) => {
              const { total, id, payment, printed } = order;
              return (
              <div key={index} className="h5 border border-color--grey flex justify-content--between p1 mb1 center">
                <div className="flex flex-direction--column">
                  <span className="mb1">Order placed</span>
                  <span>{getDateTimeFormat(payment.created_at)}</span>
                </div>
                <div className="flex flex-direction--column">
                  <span className="mb1">Total</span>
                  <span>{fromCentsToDollars(total)}</span>
                </div>
                <div className="flex flex-direction--column">
                  <span className="mb1">Status</span>
                  <span>{printed ? 'Completed' : 'Ready to Print'}</span>
                </div>
                <div className="flex flex-direction--column">
                  <span className="mb1">Order #{id}</span>
                  <div>
                    <span className="mr1">Order details</span>
                    <span>Invoice</span>
                  </div>
                </div>
              </div>
            )}) }

          </div>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  clientOrders: state.clientOrders
})

const mapDispatchToProps = (dispatch) => ({
  startSetClientOrders: () => dispatch(startSetClientOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
