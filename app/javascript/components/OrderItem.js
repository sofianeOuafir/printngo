import React from "react"
import { connect } from 'react-redux';

import images from './../images';
import { removeOrderItem, updateOrderItem } from './../actions/orderItems';

class OrderItem extends React.Component {
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
    const { orderItem } = this.props;
    return (
      <div className="border flex justify-content--around py2 mb1 h4"> 
        <div className="center">
          <div>
            <img src={images.aDocument} alt="Document Icon" width={100}/>
          </div>
          <div className="flex align-items--center mt1">
            <a className="mr1 pointer">View</a>
            <a className="pointer" onClick={() => { this.onRemove(orderItem.id) } }>Remove</a>
          </div>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">{orderItem.document.name}</span>
          <span>{`${orderItem.document.number_of_page} Page`}</span>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Print In: </span>
          <select value={orderItem.product_id} onChange={(e) => { this.onProductChange({ e: e, orderItemId: orderItem.id }) }}>
          { this.props.products.map((product, index) => (
            <option key={index} value={product.id}>{product.name}</option>
          )) }
          </select>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Quantity:</span>
          <div className="flex justify-content--around">
            <a onClick={(e) => { this.onQuantityChange({ e, orderItemId: orderItem.id, currentQuantity: orderItem.quantity, action: 'minus'  }) } }>
              <img src={images.minus} alt="Document Icon" width={30}/>
            </a>
            <span>{orderItem.quantity}</span>
            <a onClick={(e) => { this.onQuantityChange({ e, orderItemId: orderItem.id, currentQuantity: orderItem.quantity, action: 'plus'  }) } }>          
              <img src={images.plus} alt="Document Icon" width={30}/>
            </a>
          </div>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Price:</span>
          <span>${orderItem.sub_total / 100}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeOrderItem: (orderItemId) => dispatch(removeOrderItem(orderItemId)),
    updateOrderItem: ({ id, updates }) => dispatch(updateOrderItem({ id, updates}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);