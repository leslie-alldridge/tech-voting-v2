import { isAuthenticated } from '../utils/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  suggestions: [],
  comments: []
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM_REQ':
      return {
        isFetching: true,
        isAuthenticated: true
      };
    case 'ITEM_ADDED':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        suggestions: action.data
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
        suggestions: action.data,
        liked: action.liked
      };
    case 'ITEM_COMMENTED':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        suggestions: action.data,
        commented: action.commented
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
