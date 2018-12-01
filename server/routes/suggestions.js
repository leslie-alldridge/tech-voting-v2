let router = require('express').Router();

let { addSuggestions, getSuggestions, upVote } = require('../db/suggestions');

router.get('/all', (req, res) => {
  getSuggestions().then(response => {
    res.json(response);
  });
});

router.post('/add', (req, res) => {
  const { title, description, category, user } = req.body;
  let data = {
    title,
    description,
    votes: 1,
    category,
    user
  };
  addSuggestions(data).then(response => {
    res.json(response);
  });
});

router.post('/upvote', (req, res) => {
  console.log('hit');

  console.log(req);
  const { id } = req.body;
  upVote(id).then(response => {
    console.log(response);

    res.json(response);
  });
});

module.exports = router;
