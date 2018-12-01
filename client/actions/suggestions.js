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

//Reading suggestions from DB
export function getSuggestionAction() {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/all').then(response => {
      dispatch(receiveSuggestion(response.body));
      document.location = '/#/';
    });
  };
}

//Adding suggestions to DB
export function addSuggestionAction(data) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/add', data).then(response => {
      dispatch(receiveSuggestion(response.body));
      document.location = '/#/';
    });
  };
}

//Up voting suggestion
export function upVoteAction(id) {
  console.log(id);

  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/upvote', id).then(response => {
      dispatch(receiveSuggestion(response.body));
      document.location = '/#/';
    });
  };
}
