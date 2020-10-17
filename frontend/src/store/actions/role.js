import * as actionTypes from "./actionTypes";
import { axiosInstance as axios } from "../../services/axiosInstance";
import toastr from "toastr";

export const fetchRolesStart = () => {
  return {
    type: actionTypes.FETCH_ROLES_START
  };
};
export const fetchRolesSuccess = data => {
  return {
    type: actionTypes.FETCH_ROLES_SUCCESS,
    data: data
  };
};

export const fetchRolesFail = error => {
  return {
    type: actionTypes.FETCH_ROLES_FAIL,
    error: error
  };
};

export const fetchRoles = () => {
  return dispatch => {
    dispatch(fetchRolesStart());
    axios
      .get("/api/roles/read")
      .then(response => {
        dispatch(fetchRolesSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchRolesFail(err));
      });
  };
};
export const fetchRoleStart = () => {
  return {
    type: actionTypes.FETCH_ROLE_START
  };
};

export const fetchRoleSuccess = data => {
  return {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
  };
};

export const fetchRoleFail = error => {
  return {
    type: actionTypes.FETCH_ROLE_FAIL,
    error: error
  };
};

export const fetchRole = id => {
  return dispatch => {
    dispatch(fetchRoleStart(id));
    /*   dispatch(fetchRoleSuccess());
    dispatch(fetchRoleFail()); */

    axios
      .get("/api/roles/read/" + id)
      .then(response => {
        dispatch(fetchRoleSuccess(response.data));
        toastr.success("Role Successfully retrieved");
      })
      .catch(err => {
        dispatch(fetchRoleFail(err));
      });
  };
};
export const createRoleStart = () => {
  return {
    type: actionTypes.CREATE_ROLE_START
  };
};

export const createRoleSuccess = data => {
  return {
    type: actionTypes.CREATE_ROLE_SUCCESS,
    data: data
  };
};

export const createRoleFail = error => {
  return {
    type: actionTypes.CREATE_ROLE_FAIL,
    error: error
  };
};

export const createRole = (data, sortBy) => {
  return dispatch => {
    dispatch(createRoleStart());
    axios
      .post("/api/roles/create", data)
      .then(response => {
        toastr.success("Role Successfully created");
        dispatch(createRoleSuccess(response.data));
      })
      .catch(err => {
        dispatch(createRoleFail(err));
      });
  };
};
export const updateRoleStart = () => {
  return {
    type: actionTypes.UPDATE_ROLE_START
  };
};

export const updateRoleSuccess = data => {
  return {
    type: actionTypes.UPDATE_ROLE_SUCCESS,
    data: data
  };
};

export const updateRoleFail = error => {
  return {
    type: actionTypes.UPDATE_ROLE_FAIL,
    error: error
  };
};

export const updateRole = (data, sortBy) => {
  return dispatch => {
    dispatch(updateRoleStart());
    axios
      .post("/api/roles/update", data)
      .then(response => {
        dispatch(updateRoleSuccess(response.data));
        toastr.success("Role Successfully updated");
      })
      .catch(err => {
        dispatch(updateRoleFail(err));
      });
  };
};
export const deleteRoleStart = () => {
  return {
    type: actionTypes.DELETE_ROLE_START
  };
};

export const deleteRoleSuccess = data => {
  return {
    type: actionTypes.DELETE_ROLE_SUCCESS,
    data: data
  };
};

export const deleteRoleFail = error => {
  return {
    type: actionTypes.DELETE_ROLE_FAIL,
    error: error
  };
};

export const deleteRole = id => {
  return dispatch => {
    dispatch(deleteRoleStart());
    axios
      .delete("/api/roles/delete/" + id)
      .then(response => {
        dispatch(deleteRoleSuccess(response.data));
        toastr.success("Role Successfully deleted");
      })
      .catch(err => {
        dispatch(deleteRoleFail(err));
      });
  };
};

export const newRoleStart = () => {
  return {
    type: actionTypes.NEW_ROLE_START
  };
};

export const newRoleSuccess = data => {
  return {
    type: actionTypes.NEW_ROLE_SUCCESS,
    data: data
  };
};

export const newRoleFail = error => {
  return {
    type: actionTypes.NEW_ROLE_FAIL,
    error: error
  };
};
export const getRolesFromCache = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_ROLES_FROM_CACHE
    });
  };
};
export const newRole = data => {
  return dispatch => {
    dispatch(newRoleStart());
    dispatch(newRoleSuccess("success"));
    dispatch(newRoleFail("error"));
  };
};
