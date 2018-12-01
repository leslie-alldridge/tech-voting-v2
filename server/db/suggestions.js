const db = require('./connection');

function getSuggestions() {
  return db('ideas').select();
}

function addSuggestions(data) {
  return db('ideas')
    .insert(data)
    .then(data => {
      return db('ideas').select();
    });
}

function upVote(id) {
  return db('ideas')
    .where('id', id)
    .update({ votes: db.raw('votes + 1') })
    .then(data => {
      return db('ideas').select();
    });
}

function addComment(comment, id) {
  console.log(comment, id);
  let row = {
    id,
    comment: comment[0]
  };
  return db('comments')
    .insert(row)
    .then(data => {
      return db('comments').select();
    });
}

module.exports = {
  getSuggestions,
  addSuggestions,
  upVote,
  addComment
};
