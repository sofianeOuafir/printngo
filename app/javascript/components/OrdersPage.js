import React from "react"
import Layout from './Layout';
import axios from 'axios';
import { connect } from 'react-redux';

import Loader from './Loader';
import { startSetClientOrders } from './../actions/orders';

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
            <h1>Your Orders</h1>
            { clientOrders.map((order, index) => (
              <div key={index} className="border">
                <div>
                  Order placed
                  <p>{order.createdAt}</p>
                </div>
                <div>
                  Total
                  <p>{order.total}</p>
                </div>
                <div>
                  Status
                </div>
                <div>
                  Order # {order.id}
                </div>
              </div>
            )) }

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
