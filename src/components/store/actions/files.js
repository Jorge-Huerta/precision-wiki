import * as actionTypes from "./actionTypes";
import API from "../../API/api";

export const setFiles = files => {
  return {
    type: actionTypes.SET_FILES,
    files: files
  };
};

export const initFiles = courseId => {
  return dispatch => {
    return API.get(`/aporte_del_curso/${courseId}`)
      .then(res => {
        dispatch(setFiles(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createFiles = newData => {
  return {
    type: actionTypes.CREATE_FILES,
    newData: newData
  };
};

export const addFiles = (courseId, newData) => {
  return dispatch => {
    return API.post(`/aporte_del_curso/${courseId}`, newData)
      .then(newData => {
        dispatch(createFiles(newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateFiles = (oldData, newData) => {
  return {
    type: actionTypes.UPDATE_FILES,
    oldData: oldData,
    newData: newData
  };
};

export const putFiles = (oldData, newData) => {
  return dispatch => {
    return API.put(`/aporte_del_curso/${oldData.id}`, {
      nombre: newData.nombre,
      descripcion: newData.descripcion,
      contenido: newData.contenido
    })
      .then(res => {
        dispatch(updateFiles(oldData, newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteFiles = oldData => {
  return {
    type: actionTypes.DELETE_FILES,
    oldData: oldData
  };
};

export const removeFiles = oldData => {
  return dispatch => {
    return API.delete(`/aporte_del_curso/${oldData.id}`)
      .then(res => {
        dispatch(deleteFiles(oldData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
