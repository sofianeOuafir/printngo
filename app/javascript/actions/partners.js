import axios from 'axios';

export const setPartners = partners => dispatch => {
  return dispatch({
    type: "SET_PARTNERS",
    partners
  });
};

export const startSetPartners = ({ usersPositionlat, usersPositionlng, boundsSWLat, boundsSWLng, boundsNELat, boundsNELng } = {lat: null, lng: null}) => dispatch => {
  return axios.get('/api/v1/partners', {
    params: { usersPositionlat, usersPositionlng, boundsSWLat, boundsSWLng, boundsNELat, boundsNELng }
  }).then((response) => {
    dispatch(setPartners(response.data));
    return response;
  })
};