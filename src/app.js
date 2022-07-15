const express = require('express');
const fs = require('fs');
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
  const signupRouter = express.Router();
  const loginRouter = express.Router();
  const apiRouter = express.Router();

  const middleWare = [express.json(), express.raw(), express.urlencoded({ extended: true }), express.static(path), logRequest, injectCookies, injectSession(sessions)];

  app.use(middleWare);

  app.use('/signup', signupRouter);
  signupRouter.get('/', serveSignUpPage);
  signupRouter.post('/', registerUser(users, userDetails));

  app.use('/login', loginRouter);
  loginRouter.get('/', serveLoginPage);
  loginRouter.post('/', userLogin(users, sessions));

  app.get('/logout', logoutUser(sessions));

  app.get('/guest-book', guestBookRouter(comments, template));
  app.post('/add-comment', addCommentHandler(comments, guestbook));

  app.use('/api', apiRouter);
  apiRouter.get('/comments', serveAllComments(comments));
  apiRouter.get('/search/:name', serveCommentsOf(comments))

  return app;
};

module.exports = { myApp };
