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
      dispatch(receiveEmail(response.body));
    });
  };
}

export function receiveEmail(data) {
  return {
    type: "GOT_EMAIL",
    isFetching: false,
    isAuthenticated: true,
    res: data
  };
}

export function newPasswordAction(password, user) {
  return function(dispatch) {
    dispatch(requestUsers());
    return request("post", "users/password", { password, user }).then(
      response => {
        dispatch(receiveUsers(response.body));
      }
    );
  };
}

export function deleteUserAction(user) {
  return function(dispatch) {
    dispatch(requestUsers());
    return request("post", "users/delete", { user }).then(response => {
      dispatch(receiveUsers(response.body));
    });
  };
}
