import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';

import OrderLayout from "./OrderLayout";

class BasketPage extends React.Component {
  componentDidMount(){
    axios.get('/api/v1/orders/undefined').then((response) => {
      console.log(response);
    })
  }

  render () {
    return (
      <OrderLayout>
        basket page
      </OrderLayout>
    );
  }
}

export default BasketPage
