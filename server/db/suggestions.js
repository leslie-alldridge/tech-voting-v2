const db = require('./connection');

function getSuggestions() {
  return new Promise((resolve, reject) => {
    db('ideas')
      .select()
      .catch(err => reject(err));
  });
}

module.exports = {
  getSuggestions
};
