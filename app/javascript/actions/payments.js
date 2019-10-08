import axios from 'axios';
import { updateOrder } from './../actions/orders';

export const startCreatePayment = token => dispatch => {
  return axios.post("/api/v1/payments", {
    token
  }).then(response => {
    dispatch({
      type: "CREATE_PAYMENT",
      payment: response.data
    });
    dispatch(updateOrder(response.data.order));
    return response.data
  })
}