var router = require("express").Router();

var { userExists, createUser, emailExists } = require("../db/users");
var token = require("../auth/token");

router.post("/register", register, token.issue);

function register(req, res, next) {
  const { user_name, password, email } = req.body;
  userExists(user_name, req.app.get("db"))
    .then(exists => {
      if (exists) return res.status(400).send({ message: "User Name Taken" });
      emailExists(email, req.app.get("db")).then(exists => {
        if (exists)
          return res.status(400).send({ message: "Email already in use" });
        createUser(user_name, password, email, req.app.get("db"))
          .then(() => next())
          .catch(err => res.status(500).send({ message: "Server Error" }));
      });
    })
    .catch(err => res.status(500).send({ message: "Server Error" }));
}

router.post("/login", token.issue);

module.exports = router;
