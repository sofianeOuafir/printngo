import axios from 'axios';

export const setPartners = partners => dispatch => {
  return dispatch({
    type: "SET_PARTNERS",
    partners
  });
};

export const startSetPartners = () => dispatch => {
  axios.get('/api/v1/partners').then((response) => {
    dispatch(setPartners(response.data));
    return response;
  })
};