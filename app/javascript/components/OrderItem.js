import React from "react"
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import axios from 'axios';
import { toast } from 'react-toastify';

import images from './../images';
import { startRemoveOrderItem, startUpdateOrderItem, removeOrderItem } from './../actions/orderItems';
import { fromCentsToDollars } from './../utils/money';

class OrderItem extends React.Component {
  onRemove = (orderItemId) => {
    this.props.startRemoveOrderItem(orderItemId).then(() => {
      this.displayRemovalNotification();
    })
  }

  onProductChange = ({ e, orderItemId } ) => {
    const productId = e.target.value;
    this.props.startUpdateOrderItem({ id: orderItemId, updates: { product_id: productId }})
  }

  displayRemovalNotification = () => {
    toast.info("Item removed successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  onQuantityChange = ({ e, action, currentQuantity, orderItemId }) => {
    const { startUpdateOrderItem, removeOrderItem } = this.props
    let quantity = action === 'plus' ? currentQuantity + 1 : currentQuantity - 1;
    quantity = quantity < 0 ? 0 : quantity;
    startUpdateOrderItem({ id: orderItemId, updates: { quantity }}).then((response) => {
      const { quantity, id } = response.data;
      if(quantity === 0) {
        removeOrderItem(id)
        this.displayRemovalNotification();
      }
    })
  }

  onViewClick = (id) => {
    axios.get(`/api/v1/documents/${id}`).then((response) => {
      var win = window.open(response.data.url, '_blank');
      win.focus();
    })
  }

  render () {
    const { orderItem, products, readOnly } = this.props;
    const { id, document, quantity, sub_total, product_id, product } = orderItem;
    const { name, number_of_page, id: documentId } = document;
    return (
      <div className="border border-color--grey flex justify-content--around py2 mb1 h5"> 
        <div className="center">
          <div>
            <img src={images.pdf} alt="Document Icon" width={100}/>
          </div>
          <div className="flex align-items--center justify-content--center mt1">
            <a onClick={() => this.onViewClick(documentId)} className="pointer">View</a>
            {!readOnly && <a className="pointer ml1" onClick={() => { this.onRemove(id) } }>Remove</a>}
          </div>
        </div>
        <div className="flex flex-direction--column justify-content--center word-wrap--break-word" style={{ width: '100px'}}>
          <span className="mb2 h5" title={name}>{name.length > 30 ? `${name.substring(0, 30)}...` : name}</span>
          <span>{`${number_of_page} ${pluralize('Page', number_of_page)}`}</span>
        </div>
        <div className="flex flex-direction--column justify-content--center">
          <span className="mb2">Print In: </span>
          {readOnly ? (
            <span>{product.name}</span>
          ) : ( 
            <select value={product_id} onChange={(e) => { this.onProductChange({ e: e, orderItemId: id }) }}>
            { products.map((product, index) => (
              <option key={index} value={product.id}>{product.name}</option>
            )) }
            </select>
          )}
        </div>

          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">Quantity:</span>
            { readOnly ? (
              <span className="center">{quantity}</span>
            ) : (
              <div className="flex justify-content--around">
                <a className="pointer" onClick={(e) => { this.onQuantityChange({ e, orderItemId: id, currentQuantity: quantity, action: 'minus'  }) } }>
                  <img src={images.minus} alt="Document Icon" width={25}/>
                </a>
                <span className="px1">{quantity}</span>
                <a className="pointer" onClick={(e) => { this.onQuantityChange({ e, orderItemId: id, currentQuantity: quantity, action: 'plus'  }) } }>          
                  <img src={images.plus} alt="Document Icon" width={25}/>
                </a>
              </div>
            )}
          </div>

        <div className="flex flex-direction--column justify-content--center">
          <span className="mb2">Price:</span>
          <span>{fromCentsToDollars(sub_total)}</span>
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
    startRemoveOrderItem: (orderItemId) => dispatch(startRemoveOrderItem(orderItemId)),
    startUpdateOrderItem: ({ id, updates }) => dispatch(startUpdateOrderItem({ id, updates})),
    removeOrderItem: (orderItemId) => dispatch(removeOrderItem(orderItemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);