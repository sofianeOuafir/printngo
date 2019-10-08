import axios from 'axios';

import { setOrderItems } from './../actions/orderItems';

export const startSetOrder = (id = undefined) => dispatch => {
  return axios.get(`/api/v1/orders/${id}`).then((response) => {
    dispatch(setOrder(response.data));
    dispatch(setOrderItems(response.data.order_items));
    return response;
  })

}

export const setOrder = order => dispatch => {
  return dispatch({
    type: "SET_ORDER",
    order
  });
};

export const updateOrder = updates => dispatch => {
  return dispatch({
    type: "UPDATE_ORDER",
    updates
  });
};

export const startUpdateOrder = updates => dispatch => {
  return axios.patch(`/api/v1/orders/undefined`, updates).then(response => {
    dispatch(updateOrder(response.data));
  });
}

