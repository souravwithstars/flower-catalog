const { addCommentHandler } = require('./addCommentHandler.js');
const { serveGuestBook } = require('./serveGuestBook.js');

const guestBookRouter = (comments, template, guestBookPath) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    req.comments = comments;

    if (pathname === '/add-comment' && req.method === 'POST') {
      addCommentHandler(req, res, guestBookPath);
      return;
    }

    if (pathname === '/guest-book' && req.method == 'GET') {
      if (!req.session) {
        res.setHeader('Location', '/login');
        res.statusCode = 302;
        res.end();
        return;
      }
      serveGuestBook(req, res, template);
      return;
    }
    next();
  }
};

module.exports = { guestBookRouter };
