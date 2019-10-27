import axios from "axios";
import createHistory from "history/createBrowserHistory";

const getContext = () => {
  const history = createHistory();
  const context = history.location.pathname.slice(1).split("/")[0];
  return context;
};

export const startLogin = ({ email, password }) => dispatch => {
  const context = getContext();
  let uri;
  if (context === "partner") {
    uri = "/api/v1/partners/sessions";
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

export const logout = () => dispatch => {
  return dispatch({
    type: "LOGOUT"
  });
};

export const startLogout = () => dispatch => {
  const context = getContext();
  let uri;
  if (context === "partner") {
    uri = "/api/v1/partners/sessions/current";
  } else {
    uri = "/api/v1/users/sessions/current";
  }

  return axios.delete(uri).then(response => {
    dispatch(logout());
    return response;
  });
};
