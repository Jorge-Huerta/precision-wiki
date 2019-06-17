import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: ""
};

const authStart = (state, action) => {
  return {
    ...state
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token
  };
};

const authFail = (state, action) => {
  return {
    ...state
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
    default: {
      return state;
    }
  }
};

export default reducer;
