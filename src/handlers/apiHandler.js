const search = (comments, param) => {
  return comments.filter(({ name }) => name === param);
};

const getCommentHandler = comments => (req, res) => {
  req.comments = comments;
  res.set('content-type', 'application/json');
  res.json(req.comments);
  return true;
};

const searchCommentHandler = comments => (req, res) => {
  req.comments = comments;
  const { query } = req;
  const param = query.name;
  res.setHeader('content-type', 'application/json');
  const result = search(comments, param);
  res.json(result);
  return true;
};

module.exports = { getCommentHandler, searchCommentHandler };
