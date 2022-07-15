const express = require('express');
const fs = require('fs');
const { logRequest } = require('./handlers/logRequest.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { getSignUpHandler, postSignUpHandler } = require('./handlers/signUpHandler.js');
const { getLoginHandler, postLoginHandler } = require('./handlers/loginHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { addCommentHandler } = require('./handlers/addCommentHandler.js');
const { getCommentHandler, searchCommentHandler } = require('./handlers/serveApis/apiHandler.js');

const myApp = ({ guestbook, path, templateFile, userDetails }, sessions) => {
  const template = fs.readFileSync(templateFile, 'utf-8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf-8'));
  const users = JSON.parse(fs.readFileSync(userDetails, 'utf-8'));
  const app = express();

  app.use(express.json());
  app.use(express.raw());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path));
  app.use(logRequest);
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.get('/signup', getSignUpHandler);
  app.post('/signup', postSignUpHandler(users, userDetails))
  app.get('/login', getLoginHandler);
  app.post('/login', postLoginHandler(users, sessions));
  app.get('/logout', logoutHandler(sessions));
  app.get('/guest-book', guestBookRouter(comments, template));
  app.post('/add-comment', addCommentHandler(comments, guestbook));
  app.get('/api.comments', getCommentHandler(comments));
  app.get('/api.search', searchCommentHandler(comments));

  return app;
};

module.exports = { myApp };
