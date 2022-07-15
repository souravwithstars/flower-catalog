const fs = require('fs');
const express = require('express');
const { notFoundHandler } = require('server');

const { logRequest } = require('./handlers/logRequest.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { serveSignUpPage, registerUser } = require('./handlers/signUpHandler.js');
const { serveLoginPage, userLogin } = require('./handlers/loginHandler.js');
const { logoutUser } = require('./handlers/logoutHandler.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { addCommentHandler } = require('./handlers/addCommentHandler.js');
const { serveAllComments, serveCommentsOf } = require('./handlers/apiHandler.js');

const myApp = ({ guestbook, path, templateFile, userDetails }, sessions) => {
  const template = fs.readFileSync(templateFile, 'utf-8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf-8'));
  const users = JSON.parse(fs.readFileSync(userDetails, 'utf-8'));
  const app = express();
  const apiRouter = express.Router();

  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest);
  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/signup', serveSignUpPage);
  app.post('/register', registerUser(users, userDetails));

  app.get('/login', serveLoginPage);
  app.post('/logged-in', userLogin(users, sessions));

  app.get('/logout', logoutUser(sessions));

  app.get('/guest-book', guestBookRouter(comments, template));
  app.post('/add-comment', addCommentHandler(comments, guestbook));

  app.use('/api', apiRouter);
  apiRouter.get('/comments', serveAllComments(comments));
  apiRouter.get('/search/:name', serveCommentsOf(comments));

  app.use(express.static(path));

  app.use(notFoundHandler);

  return app;
};

module.exports = { myApp };
