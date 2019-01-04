let router = require("express").Router();

let { getUsers } = require("../db/users");

router.get("/all", (req, res) => {
  getUsers().then(data => {
    res.json(data);
  });
});

router.get("/forgot", (req, res) => {});

module.exports = router;
