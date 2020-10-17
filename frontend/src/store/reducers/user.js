import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  error: null,
  loading: false,
  newInsertedUsers: [],
  newDeletedUsers: []
};
const fetchUsersStart = (state, action) => {
  return {
    ...state,
    error: null,
    users: [],
    loading: true,
    success: false
  };
};

const fetchUsersSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    users: action.data
  };
};

const fetchUserFail = (state, action) => {
  return { ...state, error: action.error.message, loading: false };
};

const fetchUserStart = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      error: null,
      loading: false,
      success: false
    }
  };
};

const fetchUserSuccess = (state, action) => {
  return {
    ...state,
    newInsertedUsers: action.data
  };
};

const fetchUsersFail = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      error: action.error,
      loading: false,
      id: action.data._id,
      success: false
    }
  };
};
const newUserStart = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: null,
    loading: true,
    success: false
  };
};

const newUserSuccess = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: null,
    loading: false,
    success: true
  };
};

const newUserFail = (state, action) => {
  return {
    ...state,
    user: {
      username: "",
      password: "",
      role: ""
    },
    error: action.error,
    loading: false,
    success: false
  };
};
const createUserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const createUserSuccess = (state, action) => {
  let users = [...state.users];
  users.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    users: users,
    loading: false,
    success: true,
    newInsertedUsers: action.data
  };
  /*   let users = [...state.users];
  users.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    users: users,
    loading: false,
    success: true,
    newInsertedUses: newInsertedUses
  }; */
};

const createUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const updateUserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const updateUserSuccess = (state, action) => {
  let users = [...state.users];

  for (let key in users) {
    if (users[key]._id === action.data._id) {
      let update = { ...users[key] };
      update = action.data;
      users[key] = update;
    }
  }

  return {
    ...state,
    users: users,
    loading: false,
    success: true,
    newInsertedUsers: action.data
  };
};

const updateUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const deleteUserStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const deleteUserSuccess = (state, action) => {
  let users = [...state.users];
  let deletedUser = users.find(function(user) {
    return user._id === action.data._id;
  });
  let updatedUsers = users.filter(function(user) {
    return user._id !== action.data._id;
  });
  let newDeletedUsers = [...state.newDeletedUsers];
  newDeletedUsers.push(deletedUser);
  return {
    ...state,
    users: updatedUsers,
    error: null,
    success: true,
    user: {
      ...state.user,
      updateError: null,
      updateLoading: false,
      _id: action.data._id,
      success: false
    },
    newDeletedUsers: newDeletedUsers
  };
};

const deleteUserFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);
    case actionTypes.CREATE_USER_START:
      return createUserStart(state, action);
    case actionTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionTypes.CREATE_USER_FAIL:
      return createUserFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.DELETE_USER_START:
      return deleteUserStart(state, action);
    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);
    case actionTypes.NEW_USER_START:
      return newUserStart(state, action);
    case actionTypes.NEW_USER_SUCCESS:
      return newUserSuccess(state, action);
    case actionTypes.NEW_USER_FAIL:
      return newUserFail(state, action);
    case actionTypes.FETCH_USER_START:
      return fetchUserStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return fetchUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
