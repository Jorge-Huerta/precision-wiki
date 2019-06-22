import * as actionTypes from "../actions/actionTypes";

const initialState = {
  files: [
    {
      id_usuario: "",
      id: "",
      titulo: "",
      descripcion: "",
      contenido: ""
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILES: {
      return {
        ...state,
        files: action.files
      };
    }
    case actionTypes.CREATE_FILES:
      return {
        ...state,
        files: [...state.files, action.newData.data]
      };
    case actionTypes.UPDATE_FILES: {
      const data = [...state.files];
      const index = data.indexOf(action.oldData);
      data[index] = action.newData;
      return {
        ...state,
        files: data
      };
    }
    case actionTypes.DELETE_FILES: {
      const data = [...state.files];
      const index = data.indexOf(action.oldData);
      data.splice(index, 1);
      return {
        files: data
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
