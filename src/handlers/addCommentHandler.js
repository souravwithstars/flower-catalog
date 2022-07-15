const fs = require('fs');

const addCommentHandler = (comments, guestBookPath) => (req, res,) => {
  const { body, session } = req;
  body.name = session.username;
  body.date = new Date().toLocaleString();
  comments.unshift(body);
  fs.writeFileSync(guestBookPath, JSON.stringify(comments), 'utf8');

  res.end('');
  return;
};

module.exports = { addCommentHandler };
