export const setProducts = products => dispatch => {
  return dispatch({
    type: "SET_PRODUCTS",
    products
  });
};