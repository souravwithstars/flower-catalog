const { createServer } = require('net');
const fs = require('fs');
const { Response } = require('./response.js');
const { parseRequest } = require('./parseRequest.js');
const { serveFile, serveGuestBook, notFoundHandler } = require('./serveFileContent.js');

const handler = (request, response) => {
  const { uri } = request;
  if (uri === '/') {
    serveFile('./public/flower-catalog.html', response);
    return;
  }
  if (uri.includes('/guest-book')) {
    const template = './public/guest-book.html';
    const comments = './public/comments.json';
    serveGuestBook(request, response, template, comments);
    return;
  }
  const fileName = `./public${uri}`;
  if (fs.existsSync(fileName)) {
    serveFile(fileName, response);
    return;
  }
  notFoundHandler(response);
};

const onNewConnection = (socket, chunk, handler) => {
  const request = parseRequest(chunk);
  console.log(request.method, request.uri);
  const response = new Response(socket);
  handler(request, response);
};

const startServer = (port, handler) => {
  const server = createServer(socket => {
    socket.setEncoding('utf8');
    socket.on('data', chunk => onNewConnection(socket, chunk, handler));
    socket.on('error', err => console.log(err));
  });

  server.listen(port, () => console.log(`Listen to the port : ${port}`));
};

module.exports = { startServer, handler };
