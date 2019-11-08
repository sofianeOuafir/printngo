import axios from "axios";
import { updateClientCurrentOrder } from "./../actions/orders";

export const startCreatePrintOrderPayment = token => dispatch => {
  return axios
    .post("/api/v1/print_orders/payments", {
      token
    })
    .then(response => {
      dispatch(updateClientCurrentOrder(response.data.order));
      return response.data;
    });
};

export const startCreateTopUpOrderPayment = ({ token, productId }) => () => {
  return axios.post("/api/v1/top_up_orders/stripe_payments", {
    token,
    product_id: productId
  });
};
