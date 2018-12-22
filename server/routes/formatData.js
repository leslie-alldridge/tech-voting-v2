function formatDataFilter(resp, ideaData, status) {
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
  // filter items based on status
  let newArr = ideaData.filter(item => {
    return item.status == status;
  });
  return newArr;
}

function formatData(resp, ideaData) {
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
  return ideaData;
}

module.exports = {
  formatDataFilter,
  formatData
};
