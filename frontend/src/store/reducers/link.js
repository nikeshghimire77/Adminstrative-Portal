import * as actionTypes from "../actions/actionTypes";

const initialState = {
  links: [],
  error: null,
  loading: false,
  newInsertedLinks: {},
  newDeletedLinks: []
};
const fetchLinksStart = (state, action) => {
  return {
    ...state,
    error: null,
    links: [],
    loading: true,
    success: false
  };
};

const fetchLinksSuccess = (state, action) => {
  localStorage.setItem("links", JSON.stringify(action.data));
  return {
    ...state,
    error: null,
    loading: false,
    success: true,
    links: action.data
  };
};

const fetchLinkFail = (state, action) => {
  return { ...state, error: action.error.message, loading: false };
};

const fetchLinkStart = (state, action) => {
  return {
    ...state,
    link: {
      ...state.link,
      error: null,
      loading: false,
      success: false
    }
  };
};

const fetchLinkSuccess = (state, action) => {
  return {
    ...state,
    newInsertedLinks: action.data
  };
};

const fetchLinksFail = (state, action) => {
  return {
    ...state,
    link: {
      ...state.link,
      error: action.error,
      loading: false,
      id: action.data._id,
      success: false
    }
  };
};
const newLinkStart = (state, action) => {
  return {
    ...state,
    link: {
      linkname: "",
      password: "",
      role: ""
    },
    error: null,
    loading: true,
    success: false
  };
};

const newLinkSuccess = (state, action) => {
  return {
    ...state,
    link: {
      linkname: "",
      password: "",
      role: ""
    },
    error: null,
    loading: false,
    success: true
  };
};

const newLinkFail = (state, action) => {
  return {
    ...state,
    link: {
      linkname: "",
      password: "",
      role: ""
    },
    error: action.error,
    loading: false,
    success: false
  };
};
const createLinkStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const createLinkSuccess = (state, action) => {
  let links = [...state.links];
  links.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    links: links,
    loading: false,
    success: true,
    newInsertedLinks: action.data
  };
  /*   let links = [...state.links];
  links.unshift(action.data);
  let newInsertedUses = [...state.newInsertedUses];
  newInsertedUses.push(action.data);

  return {
    ...state,
    links: links,
    loading: false,
    success: true,
    newInsertedUses: newInsertedUses
  }; */
};

const createLinkFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const updateLinkStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const updateLinkSuccess = (state, action) => {
  
  let links = [...state.links];

  for (let key in links) {
    if (links[key]._id === action.data._id) {
      let update = { ...links[key] };
      update = action.data;
      links[key] = update;
    }
  }

  return {
    ...state,
    links: links,
    loading: false,
    success: true,
    newInsertedLinks: action.data
  };
};

const updateLinkFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const deleteLinkStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    success: false
  };
};

const deleteLinkSuccess = (state, action) => {
  let links = [...state.links];
  let deletedLink = links.find(function(link) {
    return link._id === action.data._id;
  });
  let updatedLinks = links.filter(function(link) {
    return link._id !== action.data._id;
  });
  let newDeletedLinks = [...state.newDeletedLinks];
  newDeletedLinks.push(deletedLink);
  return {
    ...state,
    links: updatedLinks,
    error: null,
    success: true,
    link: {
      ...state.link,
      updateError: null,
      updateLoading: false,
      _id: action.data._id,
      success: false
    },
    newDeletedLinks: newDeletedLinks
  };
};

const deleteLinkFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LINKS_START:
      return fetchLinksStart(state, action);
    case actionTypes.FETCH_LINKS_SUCCESS:
      return fetchLinksSuccess(state, action);
    case actionTypes.FETCH_LINKS_FAIL:
      return fetchLinksFail(state, action);
    case actionTypes.CREATE_LINK_START:
      return createLinkStart(state, action);
    case actionTypes.CREATE_LINK_SUCCESS:
      return createLinkSuccess(state, action);
    case actionTypes.CREATE_LINK_FAIL:
      return createLinkFail(state, action);
    case actionTypes.UPDATE_LINK_START:
      return updateLinkStart(state, action);
    case actionTypes.UPDATE_LINK_SUCCESS:
      return updateLinkSuccess(state, action);
    case actionTypes.UPDATE_LINK_FAIL:
      return updateLinkFail(state, action);
    case actionTypes.DELETE_LINK_START:
      return deleteLinkStart(state, action);
    case actionTypes.DELETE_LINK_SUCCESS:
      return deleteLinkSuccess(state, action);
    case actionTypes.DELETE_LINK_FAIL:
      return deleteLinkFail(state, action);
    case actionTypes.NEW_LINK_START:
      return newLinkStart(state, action);
    case actionTypes.NEW_LINK_SUCCESS:
      return newLinkSuccess(state, action);
    case actionTypes.NEW_LINK_FAIL:
      return newLinkFail(state, action);
    case actionTypes.FETCH_LINK_START:
      return fetchLinkStart(state, action);
    case actionTypes.FETCH_LINK_SUCCESS:
      return fetchLinkSuccess(state, action);
    case actionTypes.FETCH_LINK_FAIL:
      return fetchLinkFail(state, action);
    default:
      return state;
  }
};

export default reducer;
