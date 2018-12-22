let router = require('express').Router();

let {
  addSuggestions,
  getSuggestions,
  upVote,
  addComment,
  getComments,
  updateStatus,
  deleteSuggestion
} = require('../db/suggestions');

let { formatDataFilter, formatData } = require('./formatData');

router.get('/all', (req, res) => {
  getSuggestions().then(response => {
    let ideaData = response;
    getComments().then(resp => {
      ideaData = formatData(resp, ideaData);
      res.json(ideaData);
    });
  });
});

router.post('/add', (req, res) => {
  const { title, description, category, user } = req.body;
  let data = {
    title,
    description,
    votes: 1,
    category,
    user,
    commentcount: 0,
    status: 'consideration'
  };
  addSuggestions(data).then(response => {
    res.json(response);
  });
});

router.post('/upvote', (req, res) => {
  const { id, name } = req.body;
  upVote(id, name).then(response2 => {
    getSuggestions().then(response => {
      let ideaData = response;
      getComments().then(resp => {
        ideaData = formatData(resp, ideaData);
        res.json(ideaData);
      });
    });
  });
});

router.post('/comment', (req, res) => {
  const { comment, id, name } = req.body;
  addComment(comment, id, name).then(response => {
    res.json(response);
  });
});

router.get('/comments', (req, res) => {
  getComments().then(response => {
    res.json(response);
  });
});

router.post('/status', (req, res) => {
  updateStatus(req.body.status, req.body.id).then(data => {
    getSuggestions().then(response => {
      res.json(response);
    });
    //might need to retrieve comments here too, haven't tested yet
  });
});

router.get('/status', (req, res) => {
  getSuggestions().then(response => {
    let ideaData = response;
    getComments().then(resp => {
      let newArr = formatDataFilter(resp, ideaData, req.query.status);
      res.json(newArr);
    });
  });
});

router.post('/delete', (req, res) => {
  deleteSuggestion(req.body.id).then(data => {
    getSuggestions().then(response => {
      let ideaData = response;
      getComments().then(resp => {
        ideaData = formatData(resp, ideaData);
        res.json(ideaData);
      });
    });
  });
});

module.exports = router;
