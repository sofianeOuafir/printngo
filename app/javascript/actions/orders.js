export const setOrder = order => dispatch => {
  return dispatch({
    type: "SET_ORDER",
    order
  });
};