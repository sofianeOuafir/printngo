import axios from "axios";

import { setOrderItems } from "./../actions/orderItems";

export const startSetClientCurrentOrder = () => dispatch => {
  return axios.get(`/api/v1/print_orders/current`).then(response => {
    dispatch(setClientCurrentOrder(response.data));
    dispatch(setOrderItems(response.data.print_order_items));
    return response;
  });
};

const setClientCurrentOrder = order => dispatch => {
  return dispatch({
    type: "SET_CLIENT_CURRENT_ORDER",
    order
  });
};

export const setClientOrder = order => dispatch => {
  return dispatch({
    type: "SET_CLIENT_ORDER",
    order
  });
};

export const startSetClientOrder = id => dispatch => {
  return axios.get(`/api/v1/users/print_orders/${id}`).then(response => {
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

export const startSetClientOrders = (
  url = "/api/v1/users/print_orders"
) => dispatch => {
  return axios.get(url).then(response => {
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
  return axios
    .patch(`/api/v1/print_orders/undefined`, updates)
    .then(response => {
      dispatch(updateClientCurrentOrder(response.data));
      return response;
    });
};

export const startSetPartnerOrder = secretCode => dispatch => {
  return axios
    .get(`/api/v1/partners/print_orders/${secretCode}`)
    .then(response => {
      dispatch(setPartnerOrder(response.data));
      return response;
    });
};

export const setPartnerOrder = order => dispatch => {
  return dispatch({
    type: "SET_PARTNER_ORDER",
    order
  });
};

export const startUpdatePartnerOrder = ({
  secretCode,
  updates
}) => dispatch => {
  return axios
    .patch(`/api/v1/partners/print_orders/${secretCode}`, updates)
    .then(response => {
      dispatch(updatePartnerOrder(response.data));
      return response;
    });
};

const updatePartnerOrder = updates => dispatch => {
  return dispatch({
    type: "UPDATE_PARTNER_ORDER",
    updates
  });
};

export const startSetPartnerOrders = () => dispatch => {
  return axios.get("/api/v1/partners/print_orders").then(response => {
    dispatch(setPartnerOrders(response.data));
    return response;
  });
};

const setPartnerOrders = partnerOrders => dispatch => {
  return dispatch({
    type: "SET_PARTNER_ORDERS",
    partnerOrders
  });
};
