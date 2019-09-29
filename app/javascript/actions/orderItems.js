import axios from 'axios';

export const setOrderItems = orderItems => dispatch => {
  return dispatch({
    type: "SET_ORDER_ITEMS",
    orderItems
  });
};



export const addOrderItem = orderItem => dispatch => {
  dispatch({
    type: "UPDATE_ORDER",
    updates: orderItem.order
  })

  dispatch({
    type: "ADD_ORDER_ITEM",
    orderItem
  })
};

export const removeOrderItem = orderItemId => dispatch => {
  axios.delete(`api/v1/order_items/${orderItemId}`).then(response => {
    dispatch({
      type: "UPDATE_ORDER",
      updates: response.data.order
    });
    dispatch({
      type: "REMOVE_ORDER_ITEM",
      orderItemId
    });
  })
};

export const updateOrderItem = ({ id, updates }) => dispatch => {
  axios.patch(`api/v1/order_items/${id}`, updates).then(response => {
    dispatch({
      type: "UPDATE_ORDER",
      updates: response.data.order
    });
    dispatch({
      type: "UPDATE_ORDER_ITEM",
      id,
      updates: response.data
    });
  })
}
