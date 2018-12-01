import { isAuthenticated } from '../utils/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: isAuthenticated(),
  suggestions: []
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
        isFetching: false,
        isAuthenticated: true,
        suggestions: action.data,
        liked: action.liked
      };
    case 'ITEM_COMMENTED':
      return {
        isFetching: false,
        isAuthenticated: true,
        suggestions: action.data,
        commented: action.commented
      };
    default:
      return state;
  }
}
