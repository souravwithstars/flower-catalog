const fs = require('fs');

const signUpPage = `
<html>
<head>
  <title>sign-up</title>
</head>
<body>
  <form action="signup" method="post">
    <div>
      <label for="username">Username : </label>
      <input type="text" name="username" id="username">
    </div>
    <div>
      <label for="password"> Password : </label>
      <input type="password" name="password" id="password">
    </div>
    <div>
      <input type="submit" value="SIGN-UP">
    </div>
  </form>
</body>
</html>`;

const getSignUpHandler = (req, res) => {
  res.set('content-type', 'text/html');
  res.end(signUpPage);
};

const postSignUpHandler = (users, userDetails) => (req, res, next) => {
  users.push(req.body);
  fs.writeFileSync(userDetails, JSON.stringify(users), 'utf-8');
  res.end('Registered Successfully!!');
};

module.exports = { getSignUpHandler, postSignUpHandler };
