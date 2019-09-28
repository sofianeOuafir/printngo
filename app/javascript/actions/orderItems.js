import axios from 'axios';

export const setOrderItems = orderItems => dispatch => {
  return dispatch({
    type: "SET_ORDER_ITEMS",
    orderItems
  });
};

export const removeOrderItem = orderItemId => dispatch => {
  axios.delete(`api/v1/order_items/${orderItemId}`).then(response => {
    return dispatch({
      type: "REMOVE_ORDER_ITEM",
      orderItemId
    });
  })
};

export const updateOrderItem = ({ id, updates }) => dispatch => {
  axios.patch(`api/v1/order_items/${id}`, updates).then(response => {
    return dispatch({
      type: "UPDATE_ORDER_ITEM",
      id,
      updates: response.data
    });
  })
}
