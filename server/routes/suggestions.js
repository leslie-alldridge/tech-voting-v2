let router = require('express').Router();

let { addSuggestions, getSuggestions } = require('../db/suggestions');

router.get('/all', (req, res) => {
  getSuggestions().then(response => {
    res.json(response);
  });
});

router.post('/add', (req, res) => {
  console.log(req.body);
  const { title, description, category } = req.body;
  let data = {
    title,
    description,
    votes: 1,
    category
  };
  addSuggestions(data).then(response => {
    console.log(response);

    res.json(response);
  });
});

module.exports = router;
