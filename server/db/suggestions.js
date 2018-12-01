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

module.exports = {
  getSuggestions,
  addSuggestions
};
