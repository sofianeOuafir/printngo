import axios from "axios";
import { updateClientCurrentOrder } from "./../actions/orders";
import { updateWalletBalance } from "./../actions/auth";

export const startCreatePrintOrderPayment = token => dispatch => {
  return axios
    .post("/api/v1/print_orders/payments", {
      token
    })
    .then(response => {
      dispatch(updateWalletBalance(response.data.order.user.wallet_balance));
      dispatch(updateClientCurrentOrder(response.data.order));
      return response;
    });
};

export const startCreateTopUpOrderPayment = ({
  token,
  productId
}) => dispatch => {
  return axios
    .post("/api/v1/top_up_orders/stripe_payments", {
      token,
      product_id: productId
    })
    .then(response => {
      dispatch(updateWalletBalance(response.data.user.wallet_balance));
      return response;
    });
};
