import axios from "axios";

export const startSetDocuments = () => dispatch => {
  return axios.get('/api/v1/documents').then((response) => {
    dispatch({
      type: 'SET_DOCUMENTS',
      documents: response.data
    });
    return response;
  })
}