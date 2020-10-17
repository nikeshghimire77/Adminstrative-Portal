// combine all reducers

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import AuthReducer from "./auth";
import UserReducer from "./user";
import LinkReducer from "./link";
import RoleReducer from "./role";

const appReducer = combineReducers({
  auth: AuthReducer,
  users: UserReducer,
  links: LinkReducer,
  roles: RoleReducer
});

const rootReducer = (state, action) => {
  const re = appReducer(state, action);
  return re;
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: []
};

const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;
