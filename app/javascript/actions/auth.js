import axios from 'axios';

export const startLogin = ({email, password}) => dispatch => {
  return axios.post('/api/v1/sessions', {
    email,
    password
  }).then((response) => {
    return dispatch({
      type: 'LOGIN',
      user: response.data
    });
  }).catch((e) => {
    console.log(e);
  })
}

export const startGetCurrentUser = () => dispatch => {
  return axios.get('/api/v1/sessions/undefined').then((response) => {
    if(response.data) {
      return dispatch({
        type: 'LOGIN',
        user: response.data
      });
    } else {
      return dispatch(logout());
    }
  })
}

export const logout = () => dispatch => {
  return dispatch({
    type: 'LOGOUT'
  });
}

export const startLogout = () => dispatch => {
  return axios.delete('/api/v1/sessions/undefined').then((response) => {
    return dispatch(logout());
  })
}