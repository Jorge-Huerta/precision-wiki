import * as actionTypes from "../actions/actionTypes";

const initialState = {
  username: "",
  password: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return state;
    case actionTypes.AUTH_FAIL:
      return state;
    default:
    return state
  }
};

export default reducer;
