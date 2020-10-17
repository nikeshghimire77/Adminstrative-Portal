import * as actionTypes from "./actionTypes";
import { UserService } from "../../services/";
import { history } from "./../../utils/history";
import setAuthorizationToken from "./../../utils/setAuthorizationToken";
import toastr from "toastr";

let firstTry = true;
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  toastr.success("User Successfully logout");

  window.location.reload();
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    const payload = {
      username: email,
      password: password
    };

    UserService.login(payload)
      .then(response => {
        let userObj = response.data;
        console.log("auth kiran sucecsss", userObj);
        if (userObj.user.roles) {
          dispatch(authSuccess(userObj.token, userObj));
          setAuthorizationToken(userObj.token);
          toastr.success("User Successfully logged");
        } else {
          let error = {
            message:
              "user don't have admin permission,Please contact administrator",
            status: "500"
          };
          dispatch(authFail(error));
        }

        history.push("/home");
      })
      .catch(error => {
        if (firstTry) {
          firstTry = false;
          dispatch(auth(email, password));
        }
        dispatch(authFail(error));
      });
  };
};

export const setAuthenticationFromCache = () => {
  return {
    type: actionTypes.SET_AUTHENTICATION_FROM_CACHE
  };
};
