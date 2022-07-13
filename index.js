const fs = require('fs');
const { startServer } = require('server');
const { app } = require('./src/app.js');

const main = config => {
  const sessions = {};
  startServer(4567, app(config, sessions));
};

const config = {
  guestbook: 'public/comments.json',
  templateFile: 'public/guest-book.html',
  path: './public',
  userDetails: 'public/userDetails.json'
};

main(config);
