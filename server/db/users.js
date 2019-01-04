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

function userResetReq(email, token, date, testDb) {
  const connection = testDb || knex;
  return connection("users")
    .where("email", email)
    .update({
      resetPasswordToken: token,
      resetPasswordExpires: date
    })
    .then(data => console.log(data));
}

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUsers,
  emailExists,
  userResetReq
};
