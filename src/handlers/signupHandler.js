const fs = require('fs');

const serveSignUpPage = (req, res, next) => {
  req.url = req.url + '.html';
  next();
};

const registerUser = (users, userDetails) => (req, res, next) => {
  users.push(req.body);
  fs.writeFileSync(userDetails, JSON.stringify(users), 'utf-8');
};

module.exports = { serveSignUpPage, registerUser };
