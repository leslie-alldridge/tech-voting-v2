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
    let ideaData = response;
    getComments().then(resp => {
      let commentData = resp;
      // we now have all the comments and ideas in here
      let count = [];
      //map over ideas
      ideaData.map(idea => {
        //map over comments too
        return commentData.map(comment => {
          if (idea.id == comment.id) {
            count.push(idea.id);
          }
        });
      });
      // counts occurences
      result = {};
      for (var i = 0; i < count.length; ++i) {
        if (!result[count[i]]) result[count[i]] = 0;
        ++result[count[i]];
      }
      //matches keys and inserts values into old object with ideas
      Object.keys(result).forEach(function(key, index) {
        ideaData.map(idea => {
          if (idea.id == key) {
            idea.commentcount = result[key];
          }
        });
      });
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
  const { id } = req.body;
  upVote(id).then(response2 => {
    getSuggestions().then(response => {
      let ideaData = response;
      getComments().then(resp => {
        let commentData = resp;
        // we now have all the comments and ideas in here
        let count = [];
        //map over ideas
        ideaData.map(idea => {
          //map over comments too
          return commentData.map(comment => {
            if (idea.id == comment.id) {
              count.push(idea.id);
            }
          });
        });
        // counts occurences
        result = {};
        for (var i = 0; i < count.length; ++i) {
          if (!result[count[i]]) result[count[i]] = 0;
          ++result[count[i]];
        }
        //matches keys and inserts values into old object with ideas
        Object.keys(result).forEach(function(key, index) {
          ideaData.map(idea => {
            if (idea.id == key) {
              idea.commentcount = result[key];
            }
          });
        });
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

module.exports = router;
