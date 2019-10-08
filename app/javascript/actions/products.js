import axios from 'axios'; 

export const startSetProducts = () => dispatch => {
  return axios.get('/api/v1/products').then((response) => {
    dispatch(setProducts(response.data));
    return response;
  })
}
export const setProducts = products => dispatch => {
  return dispatch({
    type: "SET_PRODUCTS",
    products
  });
};