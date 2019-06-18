import * as actionTypes from "../actions/actionTypes";
const jwtDecode = require("jwt-decode");

const initialState = {
  token: "",
  decodedToken: {
    id: "",
    name: "",
    run: "",
    administrador: "",
    aportador: ""
  },
  error: ""
};

const authStart = (state, action) => {
  return {
    ...state
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    decodedToken: jwtDecode(action.token)
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: "",
    decodedToken: "",
    error: ""
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return authStart(state, action);
    }
    case actionTypes.AUTH_SUCCESS: {
      return authSuccess(state, action);
    }
    case actionTypes.AUTH_FAIL: {
      return authFail(state, action);
    }
    case actionTypes.AUTH_LOGOUT: {
      return authLogout(state, action);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
