import * as actionTypes from "../actions/actionTypes";

const initialState = {
  courses: [
    {
      id: "",
      nombre: "",
      descripcion: "",
      ruta: ""
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSES: {
      return {
        ...state,
        courses: action.courses
      };
    }
    case actionTypes.CREATE_COURSES:
      return {
        ...state,
        courses: [...state.courses, action.newData.data]
      };
    case actionTypes.UPDATE_COURSES: {
      const data = [...state.courses];
      const index = data.indexOf(action.oldData);
      data[index] = action.newData;
      return {
        ...state,
        courses: data
      };
    }
    case actionTypes.DELETE_COURSES: {
      const data = [...state.courses];
      const index = data.indexOf(action.oldData);
      data.splice(index, 1);
      console.log("la data es", data);
      return {
        courses: data
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
