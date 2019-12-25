import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { withTranslation } from "react-i18next";

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

  render() {
    const { orderItem, products, readOnly, t } = this.props;
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
          <Document name={name} numberOfPage={number_of_page} id={documentId} />
        </div>
        <div className="flex justify-content--around fullwidth">
          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">{t('orderItem.chooseFormat')} </span>
            {readOnly ? (
              <span>{t(`${product.code}.name`)}</span>
            ) : (
              <select
                value={product_id}
                onChange={e => {
                  this.onProductChange({ e: e, orderItemId: id });
                }}
              >
                {products.map((product, index) => (
                  <option key={index} value={product.id}>
                    {t(`${product.code}.name`)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-direction--column justify-content--center">
            <span className="mb2">{t('orderItem.quantity')}</span>
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
            <span className="mb2">{t('orderItem.price')}</span>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(OrderItem));
