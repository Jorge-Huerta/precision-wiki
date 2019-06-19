import API from "../../API/api";

import * as actionTypes from "./actionTypes";
//set courses
export const setUserCourses = courses => {
  return {
    type: actionTypes.SET_USERCOURSES,
    courses: courses
  };
};

export const initUserCourses = () => {
  return dispatch => {
    return API.get("/curso")
      .then(res => {
        dispatch(setUserCourses(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
//get current courses
export const displayUserCourses = newData => {
  console.log("esta es", newData);
  return {
    type: actionTypes.GET_USERCOURSES,
    newData: newData
  };
};

export const getUserCourses = userId => {
  return dispatch => {
    return API.get(`/inscripcion_curso/${userId}`)
      .then(res => {
        dispatch(displayUserCourses(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
//take courses
export const takeUserCourses = newData => {
  return {
    type: actionTypes.TAKE_USERCOURSES,
    newData: newData
  };
};

export const addUserCourses = (userId, courseId) => {
  const newData = {
    id_usuario: userId,
    id_curso: courseId
  };
  return dispatch => {
    return API.post("/inscripcion_curso", newData)
      .then(newData => {
        dispatch(takeUserCourses(newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
