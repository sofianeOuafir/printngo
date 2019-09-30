export const setPartners = partners => dispatch => {
  return dispatch({
    type: "SET_PARTNERS",
    partners
  });
};