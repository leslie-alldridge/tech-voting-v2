let router = require('express').Router();

let { getUsers } = require('../db/users');

router.get('/all', (req, res) => {
  getUsers().then(data => {
    console.log(data);
  });
});

module.exports = router;
