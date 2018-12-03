let router = require('express').Router();

let {
  addSuggestions,
  getSuggestions,
  upVote,
  addComment,
  getComments
} = require('../db/suggestions');

router.get('/all', (req, res) => {
  getSuggestions().then(response => {
    console.log(response);

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
  const { id } = req.body;
  upVote(id).then(response => {
    res.json(response);
  });
});

router.post('/comment', (req, res) => {
  const { comment, id, name } = req.body;
  addComment(comment, id, name).then(response => {
    console.log(response);

    res.json(response);
  });
});

router.get('/comments', (req, res) => {
  getComments().then(response => {
    console.log(response);

    res.json(response);
  });
});

module.exports = router;
