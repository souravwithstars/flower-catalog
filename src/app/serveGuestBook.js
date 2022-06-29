const fs = require('fs');

const createAttribute = (tag, value) => {
  return `<${tag}>${value}</${tag}>`;
};

const createTable = contents => {
  const commentsArray = contents.map(content => {
    const time = createAttribute('td', content.time);
    const name = createAttribute('td', content.name);
    const comment = createAttribute('td', content.comment);
    const info = time + name + comment;
    return createAttribute('tr', info);
  });
  return commentsArray.join('');
};

const getParams = request => {
  const searchParams = request.url.searchParams;
  const name = searchParams.get('name');
  const comment = searchParams.get('comment');
  return { name, comment };
};

const serveGuestMessage = (request, commentFile, response) => {
  const { name, comment } = getParams(request);
  const time = new Date().toLocaleString();
  let previousComments = [];
  if (fs.existsSync(commentFile)) {
    previousComments = fs.readFileSync(commentFile, 'utf8');
  }
  const comments = JSON.parse(previousComments);
  comments.unshift({ name, time, comment });
  fs.writeFileSync(commentFile, JSON.stringify(comments), 'utf8');

  response.statusCode = 302;
  response.setHeader('Location', '/guest-book');
  response.end('');
  return true;
};

const createGuestBook = (templateFile, comments) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const parsedComments = JSON.parse(comments);
  const tableData = createTable(parsedComments);
  const placedContent = template.replace('_comments_', tableData);
  return placedContent;
};

const serveGuestBook = (request, response, templateFile, commentFile) => {
  const { name, comment } = getParams(request);
  let comments = [];
  if (fs.existsSync(commentFile)) {
    comments = fs.readFileSync(commentFile, 'utf8');
  }
  if (name && comment) {
    return serveGuestMessage(request, commentFile, response);
  }

  const placedContent = createGuestBook(templateFile, comments);
  const contentType = request.getType(templateFile);
  response.setHeader('Content-type', contentType);
  response.end(placedContent);
};

module.exports = { serveGuestBook };
