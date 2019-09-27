export const setOrderItems = orderItems => dispatch => {
  return dispatch({
    type: "SET_ORDER_ITEMS",
    orderItems
  });
};