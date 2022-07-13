const fs = require('fs');
const { createRouter, notFoundHandler } = require('server');
const { parseUrlSearchParams } = require('./handlers/parseUrlSearchParams.js');
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
const { apiHandler } = require('./handlers/serveApis/apiHandler.js');

const app = ({ guestbook, path, templateFile, userDetails }, sessions) => {
  const template = fs.readFileSync(templateFile, 'utf-8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf-8'));
  const users = JSON.parse(fs.readFileSync(userDetails, 'utf-8'));

  return createRouter(
    parseUrlSearchParams,
    receiveBodyParams,
    parseParams,
    logRequest,
    injectCookies,
    injectSession(sessions),
    signUpHandler(users, userDetails),
    loginHandler(users, sessions),
    logoutHandler(sessions),
    guestBookRouter(comments, template, guestbook),
    serveStatic(path),
    apiHandler,
    notFoundHandler
  );
};

module.exports = { app };
