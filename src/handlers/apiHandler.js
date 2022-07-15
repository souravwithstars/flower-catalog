const search = (comments, filterBy) => {
  return comments.filter(({ name }) => name === filterBy);
};

const serveAllComments = comments => (req, res) => {
  req.comments = comments;
  res.set('content-type', 'application/json');
  res.json(req.comments);
  return true;
};

const serveCommentsOf = comments => (req, res) => {
  req.comments = comments;
  const filterBy = req.params.name;
  res.setHeader('content-type', 'application/json');
  const result = search(comments, filterBy);
  res.json(result);
  return true;
};

module.exports = { serveAllComments, serveCommentsOf };
