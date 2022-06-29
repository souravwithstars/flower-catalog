const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.end('404 NOT FOUND');
};

module.exports = { notFoundHandler };
