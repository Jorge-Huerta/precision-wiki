import * as actionTypes from "../actions/actionTypes";

const initialState = {
  files: [
    {
      id: "",
      nombre: "",
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
      console.log("la data es", data);
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
