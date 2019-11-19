import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";

import { startUpdateOrderItem, removeOrderItem } from "./../actions/orderItems";
import { fromCentsToDollars } from "../lib/money";
import Document from "./Document";
import QuantityButton from "./QuantityButton";

class OrderItem extends React.Component {
  onProductChange = ({ e, orderItemId }) => {
    const productId = e.target.value;
    this.props.startUpdateOrderItem({
      id: orderItemId,
      updates: { product_id: productId }
    });
  };

  displayRemovalNotification = () => {
    toast.success("Item removed successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  onQuantityChange = ({ e, action, currentQuantity, orderItemId }) => {
    e.preventDefault();
    const { startUpdateOrderItem, removeOrderItem } = this.props;
    let quantity =
      action === "plus" ? currentQuantity + 1 : currentQuantity - 1;
    quantity = quantity < 0 ? 0 : quantity;
    startUpdateOrderItem({ id: orderItemId, updates: { quantity } }).then(
      response => {
        const { quantity, id } = response.data;
        if (quantity === 0) {
          removeOrderItem(id);
          this.displayRemovalNotification();
        }
      }
    );
  };

  onViewClick = id => {
    axios.get(`/api/v1/documents/${id}`).then(response => {
      var win = window.open(response.data.url, "_blank");
      win.focus();
    });
  };

  render() {
    const { orderItem, products, readOnly } = this.props;
    const {
      id,
      document,
      quantity,
      sub_total,
      product_id,
      product
    } = orderItem;
    const { name, number_of_page, id: documentId } = document;
    return (
      <div className="center order-item border border-color--grey flex align-items--center px1  py2 mb1 h5">
        <div className="order-item--document">
          <Document
            name={name}
            numberOfPage={number_of_page}
            onViewClick={() => this.onViewClick(documentId)}
          />
        </div>
        <div className="flex justify-content--around fullwidth">
          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">Print In: </span>
            {readOnly ? (
              <span>{product.name}</span>
            ) : (
              <select
                value={product_id}
                onChange={e => {
                  this.onProductChange({ e: e, orderItemId: id });
                }}
              >
                {products.map((product, index) => (
                  <option key={index} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">Quantity:</span>
            {readOnly ? (
              <span className="center">{quantity}</span>
            ) : (
              <div className="flex justify-content--around align-items--center">
                <QuantityButton
                  onClick={e => {
                    this.onQuantityChange({
                      e,
                      orderItemId: id,
                      currentQuantity: quantity,
                      action: "minus"
                    });
                  }}
                  Icon={IoMdRemoveCircle}
                />
                <span className="px1 order-item--quantity">{quantity}</span>
                <QuantityButton
                  onClick={e => {
                    this.onQuantityChange({
                      e,
                      orderItemId: id,
                      currentQuantity: quantity,
                      action: "plus"
                    });
                  }}
                  Icon={IoIosAddCircle}
                />
              </div>
            )}
          </div>

          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">Price:</span>
            <span>{fromCentsToDollars(sub_total)}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startUpdateOrderItem: ({ id, updates }) =>
      dispatch(startUpdateOrderItem({ id, updates })),
    removeOrderItem: orderItemId => dispatch(removeOrderItem(orderItemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
