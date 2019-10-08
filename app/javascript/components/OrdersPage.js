import React from "react"
import Layout from './Layout';
import axios from 'axios';

import Loader from './Loader';

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    axios.get('/api/v1/users/1/orders').then(response => {
      this.setState(() => ({ loadingData: false, orders: response.data }))
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
            <h1>Your Orders</h1>
            { this.state.orders.map((order, index) => (
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

export default OrdersPage
