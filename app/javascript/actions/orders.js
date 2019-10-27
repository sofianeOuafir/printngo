import axios from "axios";

import { setOrderItems } from "./../actions/orderItems";

export const startSetClientCurrentOrder = () => dispatch => {
  return axios.get(`/api/v1/orders/current`).then(response => {
    dispatch(setClientCurrentOrder(response.data));
    dispatch(setOrderItems(response.data.order_items));
    return response;
  });
};

const setClientCurrentOrder = order => dispatch => {
  return dispatch({
    type: "SET_CLIENT_CURRENT_ORDER",
    order
  });
};

const setClientOrder = order => dispatch => {
  return dispatch({
    type: "SET_CLIENT_ORDER",
    order
  });
};

export const startSetClientOrder = id => dispatch => {
  return axios.get(`/api/v1/users/orders/${id}`).then(response => {
    dispatch(setClientOrder(response.data));
    return response;
  });
};

const setClientOrders = clientOrders => dispatch => {
  return dispatch({
    type: "SET_CLIENT_ORDERS",
    clientOrders
  });
};

export const startSetClientOrders = () => dispatch => {
  return axios.get("/api/v1/users/orders").then(response => {
    dispatch(setClientOrders(response.data));
    return response;
  });
};

export const updateClientCurrentOrder = updates => dispatch => {
  return dispatch({
    type: "UPDATE_CLIENT_CURRENT_ORDER",
    updates
  });
};

export const startUpdateClientCurrentOrder = updates => dispatch => {
  return axios.patch(`/api/v1/orders/undefined`, updates).then(response => {
    dispatch(updateClientCurrentOrder(response.data));
  });
};

export const startSetPartnerOrder = secretCode => dispatch => {
  return axios.get(`/api/v1/partners/orders/${secretCode}`).then(response => {
    dispatch(setPartnerOrder(response.data));
    return response;
  }).catch((e) => {
    dispatch(setPartnerOrder({}));
    return e;
  })
};

const setPartnerOrder = order => dispatch => {
  return dispatch({
    type: "SET_PARTNER_ORDER",
    order
  });
};
