const search = (comments, param) => {
  return comments.filter(({ name }) => name === param);
};

const searchComment = (req, res) => {
  const { comments, query } = req;
  const param = query.name;
  res.setHeader('content-type', 'application/json');
  const result = search(comments, param);
  res.end(JSON.stringify(result));
  return true;
};

module.exports = { searchComment };
