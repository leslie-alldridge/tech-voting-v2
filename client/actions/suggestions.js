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

export function getSuggestionAction() {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/all').then(response => {
      console.log(response);

      dispatch(receiveSuggestion(response.body));
      document.location = '/#/';
    });
  };
}

export function addSuggestionAction(data) {
  console.log(data);

  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/add', data).then(response => {
      console.log(response);
      dispatch(receiveSuggestion(response.body));
      document.location = '/#/';
    });
  };
}
