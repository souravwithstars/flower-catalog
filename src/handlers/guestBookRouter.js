const { serveGuestBook } = require('./serveGuestBook.js');

const guestBookRouter = (comments, template) => (req, res) => {
  req.comments = comments;
  if (!req.session) {
    res.redirect(302, '/login');
    res.end();
    return;
  }
  serveGuestBook(req, res, template);
  return;
};

module.exports = { guestBookRouter };
