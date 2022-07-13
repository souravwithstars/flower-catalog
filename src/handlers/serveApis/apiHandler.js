const { showComments } = require('./showComments.js');
const { searchComment } = require('./search.js');

const apiHandler = (req, res, next) => {
  const { pathname } = req.url;
  if (pathname === '/api.comments') {
    if (req.method === 'GET') {
      return showComments(req, res);
    }
    return invalidReqMethod(req, res);
  }

  if (pathname === '/api.search') {
    if (req.method === 'GET') {
      return searchComment(req, res);
    }
    return invalidReqMethod(req, res);
  }
  next();
}

module.exports = { apiHandler };