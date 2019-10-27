import axios from 'axios';

import { updateClientCurrentOrder } from './orders';

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
  dispatch(updateClientCurrentOrder(orderItem.order));
  dispatch({
    type: "ADD_ORDER_ITEM",
    orderItem
  })
};

export const startRemoveOrderItem = orderItemId => dispatch => {
  return axios.delete(`/api/v1/order_items/${orderItemId}`).then(response => {
    dispatch(updateClientCurrentOrder(response.data.order));
    dispatch(removeOrderItem(orderItemId));
  })
};

export const removeOrderItem = orderItemId => dispatch => {
  dispatch({
    type: "REMOVE_ORDER_ITEM",
    orderItemId
  });
}

export const startUpdateOrderItem = ({ id, updates }) => dispatch => {
  return axios.patch(`/api/v1/order_items/${id}`, updates).then(response => {
    dispatch(updateClientCurrentOrder(response.data.order));
    dispatch({
      type: "UPDATE_ORDER_ITEM",
      id,
      updates: response.data
    });
    return response;
  })
}
