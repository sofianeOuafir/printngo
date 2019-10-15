import React from "react"
import Layout from './Layout';
import { connect } from 'react-redux';

import Loader from './Loader';
import { startSetClientOrders } from './../actions/orders';
import OrderList from "./OrderList";

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
      return (
        <Layout>
          <div className="content-container">
            <h1 className="h4 favourite-font-weight">Your Orders</h1>
            <OrderList />
          </div>
        </Layout>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSetClientOrders: () => dispatch(startSetClientOrders())
})

export default connect(null, mapDispatchToProps)(OrdersPage)
