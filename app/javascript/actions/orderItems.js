import axios from 'axios';

import { updateOrder } from './orders';

export const setOrderItems = orderItems => dispatch => {
  return dispatch({
    type: "SET_ORDER_ITEMS",
    orderItems
  });
};

export const startAddOrderItem = (document_id) => dispatch => {
  return axios.post('/api/v1/order_items', {
    document_id
  }).then((response) => {
    dispatch(addOrderItem(response.data))
    return response;
  })
}

export const addOrderItem = orderItem => dispatch => {
  dispatch(updateOrder(orderItem.order));
  dispatch({
    type: "ADD_ORDER_ITEM",
    orderItem
  })
};

export const removeOrderItem = orderItemId => dispatch => {
  axios.delete(`/api/v1/order_items/${orderItemId}`).then(response => {
    dispatch(updateOrder(response.data.order));
    dispatch({
      type: "REMOVE_ORDER_ITEM",
      orderItemId
    });
  })
};

export const updateOrderItem = ({ id, updates }) => dispatch => {
  axios.patch(`/api/v1/order_items/${id}`, updates).then(response => {
    dispatch(updateOrder(response.data.order));
    dispatch({
      type: "UPDATE_ORDER_ITEM",
      id,
      updates: response.data
    });
  })
}
