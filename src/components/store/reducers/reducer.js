import * as actionTypes from "../actions/actionTypes";

const initialState = {
  username: "",
  password: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return console.log("success");
    case actionTypes.AUTH_FAIL:
      return console.log("fail");
    default:
  }
};

export default reducer;
