const db = require('./connection');

function getSuggestions() {
  return db('ideas').select();
}

module.exports = {
  getSuggestions
};
