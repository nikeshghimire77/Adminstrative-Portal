import axios from "axios";
import promise from "promise";
import config from "../config";
import * as actions from "../store/actions/index";
import * as errorsTypes from "../store/reducers/errorsType";
const url = config.apiGateway.URL;

// Add a request interceptor
export const axiosInstance = axios.create({
  baseURL: url
});

export const setupInterceptors = (store, persistor) => {
  axiosInstance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      //If the header does not contain the token and the url not public, redirect to login
      //var accessToken = getAccessTokenFromCookies();
      let token = localStorage.getItem("token");
      //if token is found add it to the header
      if (token) {
        if (config.method !== "OPTIONS") {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => {
      store.dispatch(actions.logout());
      return promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function(response) {
      return response;
    },
    error => {
      if (errorsTypes.AUTHENTICATIONERROR === error.status) {
        store.dispatch(actions.logout());
      }
      return Promise.reject(error); // transform response.response -> response
    }
  );
};
