import React from "react"
import axios from "axios";
import { Link } from 'react-router-dom';

import Layout from "./Layout";
import OrderItemList from "./OrderItemList";
import Loader from "./Loader";
import { withRouter } from 'react-router-dom';
import PickUpLocationCard from './PickUpLocationCard';

class OrderShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    axios.get(`/api/v1/orders/${this.props.match.params.id}`).then((response) => {
      this.setState(() => ({loadingData: false, order: response.data, orderItems: response.data.order_items}))
    })
  }

  render () {
    return (
      <Layout>
        {this.state.loadingData ? (
          <Loader />
        ) : (
          <div className="h5 content-container my2">
            <Link to="/orders" className="text-navy">&larr; See All Orders</Link>
            <div className="flex justify-content--between align-items--center">
              <h1 className="h4 text-navy favourite-font-weight">Order #{this.state.order.id}</h1>
              <Link target="_blank" className="text-navy" to={`/invoice/${this.state.order.invoice.id}`}>See Invoice</Link>
            </div>
            <PickUpLocationCard partner={this.state.order.partner} readOnly={true} />
            <div className="p2 border border-color--grey">
              <h2 className="h5 text-navy favourite-font-weight">Your Order</h2>
              <OrderItemList readOnly={true} orderItems={this.state.orderItems} order={this.state.order} />
            </div>
          </div>
        )}
      </Layout>
    )
  }
}

export default withRouter(OrderShowPage)
