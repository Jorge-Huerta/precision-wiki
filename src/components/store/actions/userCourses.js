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
export const displayUserCourses = userCourses => {
  return {
    type: actionTypes.GET_USERCOURSES,
    userCourses: userCourses
  };
};

export const getUserCourses = userId => {
  console.log("userid es", userId);
  return dispatch => {
    return API.get(`/usuario_curso/${userId}`)
      .then(res => {
        console.log("el id es :", userId);
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
