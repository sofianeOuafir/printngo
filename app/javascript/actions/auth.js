import axios from "axios";
import { getContext } from "./../lib/context";

export const startLogin = ({ email, password }) => dispatch => {
  const context = getContext();
  let uri;
  if (context === "partner") {
    uri = "/api/v1/partners/sessions";
  } else if (context === "admin") {
    uri = "/api/v1/admins/sessions";
  } else {
    uri = "/api/v1/users/sessions";
  }
  return axios
    .post(uri, {
      email,
      password
    })
    .then(response => {
      dispatch({
        type: "LOGIN",
        user: response.data
      });
      return response;
    });
};

export const startSignUp = user => dispatch => {
  return axios.post("/api/v1/users", user).then(() => {
    const { email, password } = user;
    return dispatch(startLogin({ email, password }));
  });
};

export const startGetCurrentUser = () => dispatch => {
  const context = getContext();
  let uri;
  if (context === "partner") {
    uri = "/api/v1/partners/sessions/current";
  } else if (context === "admin") {
    uri = "/api/v1/admins/sessions/current";
  } else {
    uri = "/api/v1/users/sessions/current";
  }
  return axios.get(uri).then(response => {
    if (response.data) {
      dispatch({
        type: "LOGIN",
        user: response.data
      });
      return response;
    } else {
      return dispatch(logout());
    }
  });
};

const logout = () => dispatch => {
  return dispatch({
    type: "LOGOUT"
  });
};

export const updateWalletBalance = walletBalance => dispatch => {
  return dispatch({
    type: "UPDATE_WALLET_BALANCE",
    walletBalance
  });
};

export const startLogout = () => dispatch => {
  const context = getContext();
  let uri;
  if (context === "partner") {
    uri = "/api/v1/partners/sessions/current";
  } else if (context === "admin") {
    uri = "/api/v1/admins/sessions/current";
  } else {
    uri = "/api/v1/users/sessions/current";
  }

  return axios.delete(uri).then(response => {
    dispatch(logout());
    return response;
  });
};
