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
  ],
  change: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERCOURSES: {
      let arrayToFilter = action.courses;
      let arrayFilter = [...state.myCourses];
      let filteredCourses = [];

      console.log(arrayToFilter);
      console.log(arrayFilter);
      console.log(filteredCourses);
      filteredCourses = arrayToFilter.filter(item => {
        console.log("item es", item);
        return !arrayFilter.includes(item);
      });
      console.log(filteredCourses);
      return {
        ...state,
        courses: filteredCourses
      };
    }
    case actionTypes.TAKE_USERCOURSES:
      return {
        ...state,
        change: !state.change
      };
    case actionTypes.GET_USERCOURSES: {
      return {
        ...state,
        myCourses: action.userCourses
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
