const { createServer } = require('net');
const { Response } = require('./response.js');
const { parseRequest } = require('./parseRequest.js');
const { handler } = require('./serveFileContent.js');

const onNewConnection = (socket, chunk) => {
  const request = parseRequest(chunk);
  console.log(request);
  const response = new Response(socket);
  handler(request, response);
};

const startServer = port => {
  const server = createServer(socket => {
    socket.setEncoding('utf8');
    socket.on('data', chunk => {
      onNewConnection(socket, chunk);
    });
    socket.on('error', err => {
      console.log(err);
    });
  });

  server.listen(port, () => console.log(`Listen to the port : ${port}`));
};

module.exports = { startServer };
