import { isAuthenticated } from '../utils/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  suggestion: [],
  comments: []
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM_REQ':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true
      };
    case 'ITEM_ADDED':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        suggestion: action.data
      };
    case 'ITEM_ERROR':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case 'ITEM_LIKED':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        suggestion: action.data,
        liked: action.liked
      };
    case 'ITEM_COMMENTED':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,

        commented: action.commented,
        comments: action.data
      };
    case 'ALL_COMMENTS':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        comments: action.data
      };
    default:
      return state;
  }
}
