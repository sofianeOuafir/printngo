import axios from 'axios';

export const startLogin = ({email, password}) => dispatch => {
  return axios.post('/api/v1/sessions', {
    email,
    password
  }).then((response) => {
    dispatch({
      type: 'LOGIN',
      user: response.data
    });
    return response;
  })
}

export const startSignUp = (user) => dispatch => {
  return axios.post('/api/v1/users', user).then((response) => {
    const { email, password } = user;
    return dispatch(startLogin({ email, password }));
  })
}

export const startGetCurrentUser = () => dispatch => {
  return axios.get('/api/v1/sessions/undefined').then((response) => {
    if(response.data) {
      dispatch({
        type: 'LOGIN',
        user: response.data
      });
      return response;
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
    dispatch(logout());
    return response
  })
}