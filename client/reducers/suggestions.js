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
    default:
      return state;
  }
}
