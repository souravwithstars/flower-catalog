const { createRouter, notFoundHandler } = require('server');
const { receiveBodyParams } = require('./handlers/parseBodyParams.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logRequest } = require('./handlers/logRequest.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { serveStatic } = require('./server/serveStatic.js');

const app = (path, comments, template, guestBookPath, users, userDetails) => {
  const sessions = {};

  return createRouter(
    receiveBodyParams,
    parseParams,
    logRequest,
    injectCookies,
    injectSession(sessions),
    signUpHandler(users, userDetails),
    loginHandler(users, sessions),
    logoutHandler(sessions),
    guestBookRouter(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { app };
