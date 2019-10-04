import React from "react"
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import axios from 'axios';

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

  onViewClick = (id) => {
    axios.get(`/api/v1/documents/${id}`).then((response) => {
      var win = window.open(response.data.url, '_blank');
      win.focus();
    })
  }

  render () {
    const { orderItem, products } = this.props;
    const { id, document, quantity, sub_total, product_id } = orderItem;
    const { name, number_of_page, id: documentId } = document;
    return (
      <div className="border border-color--grey flex justify-content--around py2 mb1 h5"> 
        <div className="center">
          <div>
            <img src={images.aDocument} alt="Document Icon" width={100}/>
          </div>
          <div className="flex align-items--center mt1">
            <a onClick={() => this.onViewClick(documentId)} className="mr1 pointer">View</a>
            <a className="pointer" onClick={() => { this.onRemove(id) } }>Remove</a>
          </div>
        </div>
        <div className="flex flex-direction--column word-wrap--break-word" style={{ width: '100px'}}>
          <span className="mb2 h5" title={name}>{name.length > 30 ? `${name.substring(0, 30)}...` : name}</span>
          <span>{`${number_of_page} ${pluralize('Page', number_of_page)}`}</span>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Print In: </span>
          <select value={product_id} onChange={(e) => { this.onProductChange({ e: e, orderItemId: id }) }}>
          { products.map((product, index) => (
            <option key={index} value={product.id}>{product.name}</option>
          )) }
          </select>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Quantity:</span>
          <div className="flex justify-content--around">
            <a className="pointer" onClick={(e) => { this.onQuantityChange({ e, orderItemId: id, currentQuantity: quantity, action: 'minus'  }) } }>
              <img src={images.minus} alt="Document Icon" width={25}/>
            </a>
            <span className="px1">{quantity}</span>
            <a className="pointer" onClick={(e) => { this.onQuantityChange({ e, orderItemId: id, currentQuantity: quantity, action: 'plus'  }) } }>          
              <img src={images.plus} alt="Document Icon" width={25}/>
            </a>
          </div>
        </div>
        <div className="flex flex-direction--column">
          <span className="mb2">Price:</span>
          <span>${sub_total / 100}</span>
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