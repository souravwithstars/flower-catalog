const fs = require("fs");

const extensions = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  html: 'text/html',
  css: 'text/css'
};

const getType = fileName => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  return extensions[extension] || 'text/plain';
};

const serveFile = (fileName, response) => {
  const content = fs.readFileSync(fileName);
  const contentType = getType(fileName);
  response.addHeader('Content-type', contentType);
  response.send(content);
};

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

const serveGuestMessage = (request, commentFile, response) => {
  const { name, comment } = request;
  const time = new Date();
  let previousComments = [];
  if (fs.existsSync(commentFile)) {
    previousComments = fs.readFileSync(commentFile, 'utf8');
  }
  const comments = JSON.parse(previousComments);
  const newComment = { name, time, comment };
  comments.push(newComment);

  fs.writeFileSync(commentFile, JSON.stringify(comments), 'utf8');
  response.statusCode = 302;
  response.addHeader('Location', '/guest-book.html');
  response.send('');
};

const serveGuestBook = (request, response, templateFile, commentFile) => {
  const { name, comment } = request;
  let previousComments = [];
  if (fs.existsSync(commentFile)) {
    previousComments = fs.readFileSync(commentFile, 'utf8');
  }

  if (name && comment) {
    serveGuestMessage(request, commentFile, response);
    return;
  }

  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(previousComments);
  const tableData = createTable(comments);
  console.log(tableData);
  const placedContent = template.replace('_comments_', tableData);

  const contentType = getType(templateFile);
  response.addHeader('Content-type', contentType);
  response.send(placedContent);
};

const notFoundHandler = response => {
  response.statusCode = 404;
  response.send('404 NOT FOUND');
};

module.exports = { serveFile, serveGuestBook, notFoundHandler };
