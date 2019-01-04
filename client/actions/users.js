import request from "../utils/api";

export function getUsersAction() {
  return function(dispatch) {
    dispatch(requestUsers());
    return request("get", "users/all").then(response => {
      dispatch(receiveUsers(response.body));
    });
  };
}

export function requestUsers() {
  return {
    type: "GET_USERS",
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveUsers(data) {
  return {
    type: "GOT_USERS",
    isFetching: false,
    isAuthenticated: true,
    usersList: data
  };
}

export function resetPasswordAction(email) {
  return function(dispatch) {
    dispatch(requestUsers());
    return request("post", "users/forgot", { email }).then(response => {
      dispatch(receiveUsers(response.body));
    });
  };
}
