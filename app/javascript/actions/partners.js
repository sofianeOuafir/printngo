import axios from 'axios';

export const setPartners = partners => dispatch => {
  return dispatch({
    type: "SET_PARTNERS",
    partners
  });
};

export const startSetPartners = ({ lat, lng } = {lat: null, lng: null}) => dispatch => {
  return axios.get('/api/v1/partners', {
    params: { lat, lng }
  }).then((response) => {
    dispatch(setPartners(response.data));
    return response;
  })
};