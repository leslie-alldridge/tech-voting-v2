import request from '../utils/api';

export function requestSuggestion() {
  return {
    type: 'ADD_ITEM_REQ',
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveSuggestion(data) {
  return {
    type: 'ITEM_ADDED',
    isFetching: false,
    isAuthenticated: true,
    data
  };
}

export function suggestionErr(message) {
  return {
    type: 'ITEM_ERROR',
    isFetching: false,
    isAuthenticated: true,
    message
  };
}

export function addSuggestionAction() {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/all')
      .then(response => {
        dispatch(receiveSuggestion(response.body));
        document.location = '/#/';
      })
      .catch(err => {
        dispatch(suggestionErr(err.response.body.message));
      });
  };
}
