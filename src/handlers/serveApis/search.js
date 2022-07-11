const search = (comments, param) => {
  return comments.filter(({ name }) => name === param);
};

const searchComment = (req, res) => {
  const { comments, url, } = req;
  const param = url.searchParams.get('name');
  res.setHeader('content-type', 'application/json');
  const result = search(comments, param);
  res.end(JSON.stringify(result));
  return true;
};

module.exports = { searchComment };
