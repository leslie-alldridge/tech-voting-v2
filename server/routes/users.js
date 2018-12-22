let router = require('express').Router();

let { getUsers } = require('../db/users');

router.get('/all', (req, res) => {
  getUsers().then(data => {
    res.json(data);
  });
});

module.exports = router;
