import { requestSuggestion } from './suggestions';
import request from '../utils/api';

export function addCommentAction(comment, id, name) {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('post', 'suggestion/comment', { comment, id, name }).then(
      response => {
        dispatch(receiveComment(response.body));
      }
    );
  };
}

export function getCommentsAction() {
  return function(dispatch) {
    dispatch(requestSuggestion());
    return request('get', 'suggestion/comments').then(response => {
      dispatch(receiveComments(response.body));
    });
  };
}

export function receiveComment(data) {
  return {
    type: 'ITEM_COMMENTED',
    isFetching: false,
    isAuthenticated: true,
    data,
    commented: true
  };
}

export function receiveComments(data) {
  return {
    type: 'ALL_COMMENTS',
    isFetching: false,
    isAuthenticated: true,
    data
  };
}
