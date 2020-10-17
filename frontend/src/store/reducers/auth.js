import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  };
};

const setAuthFromCache = (state, action) => {
  let idToken = localStorage.getItem("token");
  let userObj = localStorage.getItem("user");
  return {
    ...state,
    token: idToken,
    user: JSON.parse(userObj),
    error: null,
    loading: false
  };
};

const authSuccess = (state, action) => {
  localStorage.setItem("token", action.token);
  localStorage.setItem("user", JSON.stringify(action.user.user));
  const result = {
    ...state,
    token: action.token,
    user: action.user.user,
    error: null,
    loading: false
  };
  return result;
};

const authFail = (state, action) => {
  localStorage.removeItem("token");
  return { ...state, error: action.error.message, loading: false, token: null };
};

const logout = state => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("links");
  localStorage.removeItem("roles");
  return { ...state, token: null, user: null };
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.SET_AUTHENTICATION_FROM_CACHE:
      return setAuthFromCache(state, action);
    default:
      return state;
  }
};

export default authReducer;
