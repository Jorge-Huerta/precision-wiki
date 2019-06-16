import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [
    {
      id: "",
      username: "",
      password: "",
      aportador: "",
      administrador: ""
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS: {
      return {
        ...state,
        users: action.users
      };
    }
    case actionTypes.CREATE_USERS:
      return {
        ...state,
        users: [...state.users, action.newData.data]
      };
    case actionTypes.UPDATE_USERS: {
      const data = [...state.users];
      const index = data.indexOf(action.oldData);
      data[index] = action.newData;
      return {
        ...state,
        users: data
      };
    }
    case actionTypes.DELETE_USERS: {
      const data = [...state.users];
      const index = data.indexOf(action.oldData);
      data.splice(index, 1);
      return {
        users: data
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
