const db = require('./connection');

function getSuggestions() {
  return db('ideas');
}

function addSuggestions(data) {
  return db('ideas')
    .insert(data)
    .then(data => {
      return db('ideas').select();
    });
}

function upVote(id, name) {
  let names = [];
  return db('ideas')
    .where('id', id)
    .then(data => {
      if (!data[0].voters) {
        names = name;
        return db('ideas')
          .where('id', id)
          .update({ votes: db.raw('votes + 1'), voters: names })
          .then(data => {
            return db('ideas').select();
          });
      } else {
        console.log('elsed');
        console.log(data[0].voters.includes(name));

        if (data[0].voters.includes(name)) names = data[0].voters;
        else {
          names = data[0].voters + ',' + name;
          return db('ideas')
            .where('id', id)
            .update({ votes: db.raw('votes + 1'), voters: names })
            .then(data => {
              return db('ideas').select();
            });
        }
      }

      //data[0].voters ? console.log('true') : console.log('false');

      console.log(names);

      console.log(data);
    });
}

function addComment(comment, id, name) {
  let row = {
    id,
    user: name,
    comment: comment[0]
  };
  return db('comments')
    .insert(row)
    .then(data => {
      return db('comments').select();
    });
}

function getComments() {
  return db('comments').select();
}

function updateStatus(status, id) {
  console.log(status, id);
  return db('ideas')
    .where('id', id)
    .update({ status: status })
    .then(data => {
      return db('ideas');
    });
}

module.exports = {
  getSuggestions,
  updateStatus,
  addSuggestions,
  upVote,
  addComment,
  getComments
};
