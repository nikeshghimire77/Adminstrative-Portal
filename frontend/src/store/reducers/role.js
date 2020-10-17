import * as actionTypes from "../actions/actionTypes";

const initialState = {
  roles: [],
  error: null,
  loading: false,
  newInsertedRoles: {},
  newDeletedRoles: []
};
const fetchRolesStart = (state, action) => {
  return {
    ...state,
    error: null,
    roles: [],
    loading: true,
    success: false
  };
};

const fetchRolesSuccess = (state, action) => {
  localStorage.setItem("roles", JSON.stringify(action.data));

  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    roles: action.data
  };
};
const getRoleFromCache = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    roles: state.roles
  };
};
const fetchRoleFail = (state, action) => {
  return { ...state, error: action.error.message, loading: false };
};

const fetchRoleStart = (state, action) => {
  return {
    ...state,
    role: {
      ...state.role,
      error: null,
      loading: false,
      success: false
    }
  };
};

const fetchRoleSuccess = (state, action) => {
  return {
    ...state,
    newInsertedRoles: action.data
  };
};

const fetchRolesFail = (state, action) => {
  return {
    ...state,
    role: {
      ...state.role,
      error: action.error,
      loading: false,
      id: action.data._id,
      success: false
    }
  };
};
const newRoleStart = (state, action) => {
  return {
    ...state,
    role: {
      name: "",
      descrition: ""
    },
    error: null,
    loading: true,
    success: false
  };
};

const newRoleSuccess = (state, action) => {
  return {
    ...state,
    role: {
      name: "",
      descrition: ""
    },
    error: null,
    loading: false,
    success: true
  };
};

const newRoleFail = (state, action) => {
  return {
    ...state,
    role: {
      name: "",
      descrition: ""
    },
    error: action.error,
    loading: false,
    success: false
  };
};
const createRoleStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const createRoleSuccess = (state, action) => {
  let roles = [...state.roles];
  roles.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    roles: roles,
    loading: false,
    success: true,
    newInsertedRoles: action.data
  };
  /*   let roles = [...state.roles];
  roles.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    roles: roles,
    loading: false,
    success: true,
    newInsertedUses: newInsertedUses
  }; */
};

const createRoleFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const updateRoleStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const updateRoleSuccess = (state, action) => {
  let roles = [...state.roles];

  for (let key in roles) {
    if (roles[key]._id === action.data._id) {
      let update = { ...roles[key] };
      update = action.data;
      roles[key] = update;
    }
  }

  return {
    ...state,
    roles: roles,
    loading: false,
    success: true,
    newInsertedRoles: action.data
  };
};

const updateRoleFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const deleteRoleStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const deleteRoleSuccess = (state, action) => {
  let roles = [...state.roles];
  let deletedRole = roles.find(function(role) {
    return role._id === action.data._id;
  });
  let updatedRoles = roles.filter(function(role) {
    return role._id !== action.data._id;
  });
  let newDeletedRoles = [...state.newDeletedRoles];
  newDeletedRoles.push(deletedRole);
  return {
    ...state,
    roles: updatedRoles,
    error: null,
    success: true,
    role: {
      ...state.role,
      updateError: null,
      updateLoading: false,
      _id: action.data._id,
      success: false
    },
    newDeletedRoles: newDeletedRoles
  };
};

const deleteRoleFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ROLES_START:
      return fetchRolesStart(state, action);
    case actionTypes.FETCH_ROLES_SUCCESS:
      return fetchRolesSuccess(state, action);
    case actionTypes.FETCH_ROLES_FAIL:
      return fetchRolesFail(state, action);
    case actionTypes.CREATE_ROLE_START:
      return createRoleStart(state, action);
    case actionTypes.CREATE_ROLE_SUCCESS:
      return createRoleSuccess(state, action);
    case actionTypes.CREATE_ROLE_FAIL:
      return createRoleFail(state, action);
    case actionTypes.UPDATE_ROLE_START:
      return updateRoleStart(state, action);
    case actionTypes.UPDATE_ROLE_SUCCESS:
      return updateRoleSuccess(state, action);
    case actionTypes.UPDATE_ROLE_FAIL:
      return updateRoleFail(state, action);
    case actionTypes.DELETE_ROLE_START:
      return deleteRoleStart(state, action);
    case actionTypes.DELETE_ROLE_SUCCESS:
      return deleteRoleSuccess(state, action);
    case actionTypes.DELETE_ROLE_FAIL:
      return deleteRoleFail(state, action);
    case actionTypes.NEW_ROLE_START:
      return newRoleStart(state, action);
    case actionTypes.NEW_ROLE_SUCCESS:
      return newRoleSuccess(state, action);
    case actionTypes.NEW_ROLE_FAIL:
      return newRoleFail(state, action);
    case actionTypes.FETCH_ROLE_START:
      return fetchRoleStart(state, action);
    case actionTypes.FETCH_ROLE_SUCCESS:
      return fetchRoleSuccess(state, action);
    case actionTypes.FETCH_ROLE_FAIL:
      return fetchRoleFail(state, action);
    case actionTypes.GET_ROLES_FROM_CACHE:
      return getRoleFromCache(state, action);
    default:
      return state;
  }
};

export default reducer;
