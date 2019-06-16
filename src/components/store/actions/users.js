import * as actionTypes from "./actionTypes";
import API from "../../API/api";

export const setUsers = users => {
  return {
    type: actionTypes.SET_USERS,
    users: users
  };
};

export const initUsers = () => {
  return dispatch => {
    return API.get("/usuario")
      .then(res => {
        dispatch(setUsers(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createUsers = newData => {
  return {
    type: actionTypes.CREATE_USERS,
    newData: newData
  };
};

export const addUsers = newData => {
  return dispatch => {
    return API.post("/usuario", newData)
      .then(newData => {
        dispatch(createUsers(newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateUsers = (oldData, newData) => {
  return {
    type: actionTypes.UPDATE_USERS,
    oldData: oldData,
    newData: newData
  };
};

export const putUsers = (oldData, newData) => {
  return dispatch => {
    return API.put(`/usuario/${oldData.id}`, {
      username: newData.username,
      password: newData.password,
      aportador: newData.aportador,
      administrador: newData.administrador
    })
      .then(res => {
        dispatch(updateUsers(oldData, newData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteUsers = oldData => {
  return {
    type: actionTypes.DELETE_USERS,
    oldData: oldData
  };
};

export const removeUsers = oldData => {
  return dispatch => {
    return API.delete(`/usuario/${oldData.id}`)
      .then(res => {
        dispatch(deleteUsers(oldData));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
