import axios from 'axios';

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

