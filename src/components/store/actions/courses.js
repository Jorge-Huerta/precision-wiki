import * as actionTypes from "./actionTypes";
import API from "../../API/api";

export const setCourses = courses => {
  return {
    type: actionTypes.SET_COURSES,
    courses: courses
  };
};

export const initCourses = () => {
  return dispatch => {
    return API.get("/curso")
      .then(res => {
        dispatch(setCourses(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createCourses = newData => {
  return {
    type: actionTypes.CREATE_COURSES,
    newData: newData
  };
};

export const addCourses = newData => {
  return dispatch => {
    return API.post("/curso", newData)
      .then(newData => {
        dispatch(createCourses(newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateCourses = (oldData, newData) => {
  return {
    type: actionTypes.UPDATE_COURSES,
    oldData: oldData,
    newData: newData
  };
};

export const putCourses = (oldData, newData) => {
  return dispatch => {
    return API.put(`/curso/${oldData.id}`, {
      nombre: newData.nombre,
      descripcion: newData.descripcion,
      route: `/${newData.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}`
    })
      .then(res => {
        dispatch(updateCourses(oldData, newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteCourses = oldData => {
  return {
    type: actionTypes.DELETE_COURSES,
    oldData: oldData
  };
};

export const removeCourses = oldData => {
  return dispatch => {
    return API.delete(`/curso/${oldData.id}`)
      .then(res => {
        dispatch(deleteCourses(oldData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
