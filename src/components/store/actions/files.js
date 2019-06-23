import * as actionTypes from "./actionTypes";
import API from "../../API/api";
//set
export const setFiles = files => {
  return {
    type: actionTypes.SET_FILES,
    files: files
  };
};

export const initFiles = courseId => {
  return dispatch => {
    return API.get(`/aportes_del_curso/${courseId}`)
      .then(res => {
        console.log("res.data", res.data);
        dispatch(setFiles(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
//create
export const createFiles = newData => {
  return {
    type: actionTypes.CREATE_FILES,
    newData: newData
  };
};

export const addFiles = newData => {
  console.log("la nueva data es", newData);
  return dispatch => {
    return API.post("/aporte", newData)
      .then(newData => {
        dispatch(createFiles(newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
//update
export const updateFiles = (oldData, newData) => {
  return {
    type: actionTypes.UPDATE_FILES,
    oldData: oldData,
    newData: newData
  };
};

export const putFiles = (oldData, newData) => {
  return dispatch => {
    return API.put(`/aporte/${oldData.id}`, {
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
//delete
export const deleteFiles = oldData => {
  return {
    type: actionTypes.DELETE_FILES,
    oldData: oldData
  };
};

export const removeFiles = oldData => {
  return dispatch => {
    return API.delete(`/aporte/${oldData.id}`)
      .then(res => {
        dispatch(deleteFiles(oldData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
