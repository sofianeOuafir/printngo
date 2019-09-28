import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UploadAndPrintButton from './UploadAndPrintButton';
import OrderLayout from "./OrderLayout";
import { setOrderItems, removeOrderItem, updateOrderItem } from './../actions/orderItems';
import { setProducts } from './../actions/products';

class BasketPage extends React.Component {
  componentDidMount(){
    axios.get('/api/v1/products').then((response) => {
      this.props.setProducts(response.data);
      console.log(this.props.products);
    })
    axios.get('/api/v1/orders/undefined').then((response) => {
      this.props.setOrderItems(response.data.order_items);
      console.log(this.props.orderItems);
    })
  }

  onRemove = (orderItemId) => {
    this.props.removeOrderItem(orderItemId);
  }

  onProductChange = ({ e, orderItemId } ) => {
    const productId = e.target.value;
    this.props.updateOrderItem({ id: orderItemId, updates: { product_id: productId }})
  }

  onQuantityChange = ({ e, action, currentQuantity, orderItemId }) => {
    const quantity = action === 'plus' ? currentQuantity + 1 : currentQuantity - 1;
    this.props.updateOrderItem({ id: orderItemId, updates: { quantity }})
  }

  render () {
    return (
      <OrderLayout title="Your Basket" nextButtonLink="/pick-up-location" nextButtonText="Pick up details">
        
        <div className="border">
          { this.props.orderItems.map((orderItem, index) => (
            <div className="border" key={index}> 
              <a onClick={() => { this.onRemove(orderItem.id) } }>Remove</a>
              <p>{orderItem.document.name}</p>
              <p>{`${orderItem.document.number_of_page} Page`}</p>
              <p>Print In: </p>
              <p>Quantity: {orderItem.quantity}</p>
              <a onClick={(e) => { this.onQuantityChange({ e, orderItemId: orderItem.id, currentQuantity: orderItem.quantity, action: 'minus'  }) } }>Minus</a>
              <a onClick={(e) => { this.onQuantityChange({ e, orderItemId: orderItem.id, currentQuantity: orderItem.quantity, action: 'plus'  }) } }>Plus</a>
              <p>Price: {orderItem.sub_total / 100}</p>
              <select value={orderItem.product_id} onChange={(e) => { this.onProductChange({ e: e, orderItemId: orderItem.id }) }}>
                { this.props.products.map((product, index) => (
                  <option key={index} value={product.id}>{product.name}</option>
                )) }
              </select>
            </div>
          )) }
          <UploadAndPrintButton text="Upload More" />
        </div>

      </OrderLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderItems: state.orderItems,
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderItems: (orderItems) => dispatch(setOrderItems(orderItems)),
    setProducts: (products) => dispatch(setProducts(products)),
    removeOrderItem: (orderItemId) => dispatch(removeOrderItem(orderItemId)),
    updateOrderItem: ({ id, updates }) => dispatch(updateOrderItem({ id, updates}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketPage);
