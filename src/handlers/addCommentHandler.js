const fs = require('fs');

const addCommentHandler = (req, res, guestBookPath) => {
  const { comments, bodyParams, session } = req;
  bodyParams.name = session.username;
  bodyParams.date = new Date().toLocaleString();
  comments.unshift(bodyParams);
  fs.writeFileSync(guestBookPath, JSON.stringify(comments), 'utf8');

  res.statusCode = 302;
  res.setHeader('Location', '/guest-book');
  res.end('');
};

module.exports = { addCommentHandler };
