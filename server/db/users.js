var hash = require("../auth/hash");

const db = require("./connection");

function createUser(user_name, password, email) {
  return new Promise((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err);
      db("users")
        .insert({ user_name, email, hash })
        .then(user_id => resolve(user_id))
        .catch(err => reject(err));
    });
  });
}
function userExists(user_name) {
  return db("users")
    .where("user_name", user_name)
    .first();
}

function getUserByName(user_name) {
  return db("users")
    .where("user_name", user_name)
    .first();
}

function getUsers() {
  return db("users");
}

function emailExists(email) {
  return db("users")
    .where("email", email)
    .first();
}

function userResetReq(email, token, date) {
  return db("users")
    .where("email", email)
    .update({
      resetPasswordToken: token,
      resetPasswordExpires: date
    })
    .then(data => console.log(data));
}

function findToken(token) {
  return db("users")
    .where("resetPasswordToken", token)
    .first();
}

function updateUserPassword(username, hash) {
  return db("users")
    .where("user_name", username)
    .update({
      hash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })
    .then(data => console.log(data));
}

function removeUser(user) {
  return db("users")
    .where("user_name", user)
    .del()
    .then(data => {
      return db("users").select();
    });
}

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUsers,
  emailExists,
  userResetReq,
  findToken,
  updateUserPassword,
  removeUser
};
