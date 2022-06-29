const { startServer, createHandlers } = require('./src/server/server.js');
const { staticFileHandle } = require('./src/app/serveStaticFile.js');
const { handleGuestBook } = require('./src/app/guestBookHandler.js');
const { notFoundHandler } = require('./src/app/notFoundHandler.js');

const routers = createHandlers(
  staticFileHandle,
  handleGuestBook,
  notFoundHandler
);

startServer(4567, routers);
