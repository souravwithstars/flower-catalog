const fs = require('fs');
const { startServer } = require('server');
const { app } = require('./src/app.js');

const main = ({ path, guestbook, templateFile, userDetails }) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));
  const users = JSON.parse(fs.readFileSync(userDetails, 'utf8'));

  startServer(4567, app(
    path,
    comments,
    template,
    guestbook,
    users,
    userDetails
  ));
};

const config = {
  guestbook: 'public/comments.json',
  templateFile: 'public/guest-book.html',
  path: './public',
  userDetails: 'public/userDetails.json'
};

main(config);
