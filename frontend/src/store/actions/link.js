import * as actionTypes from "./actionTypes";
import { axiosInstance as axios } from "../../services/axiosInstance";
import toastr from "toastr";

export const fetchLinksStart = () => {
  return {
    type: actionTypes.FETCH_LINKS_START
  };
};

export const fetchLinksSuccess = data => {
  return {
    type: actionTypes.FETCH_LINKS_SUCCESS,
    data: data
  };
};
export const fetchLinksFail = error => {
  return {
    type: actionTypes.FETCH_LINKS_FAIL,
    error: error
  };
};

export const fetchLinks = () => {
  return dispatch => {
    dispatch(fetchLinksStart());
    axios
      .get("/api/links/read")
      .then(response => {
        dispatch(fetchLinksSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchLinksFail(err));
      });
  };
};
export const fetchLinkStart = () => {
  return {
    type: actionTypes.FETCH_LINK_START
  };
};

export const fetchLinkSuccess = data => {
  return {
    type: actionTypes.FETCH_LINK_SUCCESS,
    data: data
  };
};

export const fetchLinkFail = error => {
  return {
    type: actionTypes.FETCH_LINK_FAIL,
    error: error
  };
};

export const fetchLink = id => {
  return dispatch => {
    dispatch(fetchLinkStart(id));
    axios
      .get("/api/links/read/" + id)
      .then(response => {
        dispatch(fetchLinkSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchLinkFail(err));
      });
  };
};
export const createLinkStart = () => {
  return {
    type: actionTypes.CREATE_LINK_START
  };
};

export const createLinkSuccess = data => {
  return {
    type: actionTypes.CREATE_LINK_SUCCESS,
    data: data
  };
};

export const createLinkFail = error => {
  return {
    type: actionTypes.CREATE_LINK_FAIL,
    error: error
  };
};

export const createLink = (data, sortBy) => {
  return dispatch => {
    dispatch(createLinkStart());
    axios
      .post("/api/links/create", data)
      .then(response => {
        toastr.success("Link Successfully created");
        dispatch(createLinkSuccess(response.data));
      })
      .catch(err => {
        dispatch(createLinkFail(err));
      });
  };
};
export const updateLinkStart = () => {
  return {
    type: actionTypes.UPDATE_LINK_START
  };
};

export const updateLinkSuccess = data => {
  return {
    type: actionTypes.UPDATE_LINK_SUCCESS,
    data: data
  };
};

export const updateLinkFail = error => {
  return {
    type: actionTypes.UPDATE_LINK_FAIL,
    error: error
  };
};

export const updateLink = (data, sortBy) => {
  return dispatch => {
    dispatch(updateLinkStart());
    axios
      .post("/api/links/update", data)
      .then(response => {
        dispatch(updateLinkSuccess(response.data));
        toastr.success("Link Successfully updated");
      })
      .catch(err => {
        dispatch(updateLinkFail(err));
      });
  };
};
export const deleteLinkStart = () => {
  return {
    type: actionTypes.DELETE_LINK_START
  };
};

export const deleteLinkSuccess = data => {
  return {
    type: actionTypes.DELETE_LINK_SUCCESS,
    data: data
  };
};

export const deleteLinkFail = error => {
  return {
    type: actionTypes.DELETE_LINK_FAIL,
    error: error
  };
};

export const deleteLink = id => {
  return dispatch => {
    dispatch(deleteLinkStart());
    axios
      .delete("/api/links/delete/" + id)
      .then(response => {
        dispatch(deleteLinkSuccess(response.data));
        toastr.success("Link Successfully deleted");
      })
      .catch(err => {
        dispatch(deleteLinkFail(err));
      });
  };
};

export const newLinkStart = () => {
  return {
    type: actionTypes.NEW_LINK_START
  };
};

export const newLinkSuccess = data => {
  return {
    type: actionTypes.NEW_LINK_SUCCESS,
    data: data
  };
};

export const newLinkFail = error => {
  return {
    type: actionTypes.NEW_LINK_FAIL,
    error: error
  };
};
export const newLink = data => {
  return dispatch => {
    dispatch(newLinkStart());
    dispatch(newLinkSuccess("success"));
    dispatch(newLinkFail("error"));
  };
};
