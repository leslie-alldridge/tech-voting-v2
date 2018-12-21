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

export function receiveLike(data) {
  return {
    type: 'ITEM_LIKED',
    isFetching: false,
    isAuthenticated: true,
    data,
    liked: true
  };
}

//Reading suggestions from DB
export function getSuggestionAction() {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/all').then(response => {
      dispatch(receiveSuggestion(response.body));
    });
  };
}

//Adding suggestions to DB
export function addSuggestionAction(data) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/add', data).then(response => {
      dispatch(receiveSuggestion(response.body));
    });
  };
}

//Up voting suggestion
export function upVoteAction(id, name) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/upvote', { id, name }).then(response => {
      dispatch(receiveLike(response.body));
    });
  };
}

export function updateStatusAction(status, id) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/status', { status, id }).then(
      response => {
        dispatch(receiveSuggestion(response.body));
      }
    );
  };
}

export function filterIdeasAction(status) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/status', { status }).then(response => {
      dispatch(receiveSuggestion(response.body));
    });
  };
}

export function deleteIdeaAction(id) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/delete', { id }).then(response => {
      dispatch(receiveSuggestion(response.body));
    });
  };
}
