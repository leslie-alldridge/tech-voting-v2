let router = require('express').Router();

let { getSuggestions } = require('../db/suggestions');

router.get('/all', (req, res) => {
  getSuggestions().then(response => {
    res.json(response);
  });
});

module.exports = router;
