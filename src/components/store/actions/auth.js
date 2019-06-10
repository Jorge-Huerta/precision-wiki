import API from "../../API/api";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password
    };
    API.post("/login", authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .cath(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
