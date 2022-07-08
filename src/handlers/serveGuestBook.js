const { commentsHtml } = require('./createComments.js');

const serveGuestBook = ({ comments }, res, template) => {
  const content = template.replace('__COMMENTS__', commentsHtml(comments));

  res.setHeader('content-type', 'text/html');
  res.setHeader('content-length', content.length);
  res.end(content);
  return true;
};

exports.serveGuestBook = serveGuestBook;
