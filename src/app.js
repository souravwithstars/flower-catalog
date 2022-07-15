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
const { getCommentHandler, searchCommentHandler } = require('./handlers/apiHandler.js');

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
  signupRouter.get('/', getSignUpHandler);
  signupRouter.post('/', postSignUpHandler(users, userDetails));

  app.use('/login', loginRouter);
  loginRouter.get('/', getLoginHandler);
  loginRouter.post('/', postLoginHandler(users, sessions));

  app.get('/logout', logoutHandler(sessions));

  app.get('/guest-book', guestBookRouter(comments, template));
  app.post('/add-comment', addCommentHandler(comments, guestbook));

  app.use('/api', apiRouter);
  apiRouter.get('/comments', getCommentHandler(comments));
  apiRouter.get('/search', searchCommentHandler(comments))

  return app;
};

module.exports = { myApp };
