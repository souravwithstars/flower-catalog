const { showComments } = require('./showComments.js');
const { searchComment } = require('./search.js');

const getCommentHandler = comments => (req, res) => {
  req.comments = comments;
  showComments(req, res);
  return;
};

const searchCommentHandler = comments => (req, res) => {
  req.comments = comments;
  searchComment(req, res);
  return;
};

module.exports = { getCommentHandler, searchCommentHandler };
