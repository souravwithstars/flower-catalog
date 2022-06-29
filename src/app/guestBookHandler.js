const { serveGuestBook } = require('./serveGuestBook.js');
const { getType } = require('./serveStaticFile.js');

const handleGuestBook = (request, response) => {
  if (request.matches('GET', '/guest-book')) {
    request.getType = getType;
    const template = './public/guest-book.html';
    const comments = './public/comments.json';
    serveGuestBook(request, response, template, comments);
    return true;
  }
  return false;
};

module.exports = { handleGuestBook };
