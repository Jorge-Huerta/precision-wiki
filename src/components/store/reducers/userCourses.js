import * as actionTypes from "../actions/actionTypes";

const initialState = {
  courses: [
    {
      id: "",
      nombre: "",
      descripcion: "",
      ruta: ""
    }
  ],
  myCourses: [
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
    case actionTypes.SET_USERCOURSES: {
      return {
        ...state,
        courses: action.courses
      };
    }
    case actionTypes.TAKE_USERCOURSES:
      return {
        ...state
      };
    case actionTypes.GET_USERCOURSES: {
      return {
        ...state,
        myCourses: action.courses
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
