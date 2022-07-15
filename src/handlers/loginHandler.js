const createSession = username => {
  const date = new Date();
  const id = date.getTime();
  const session = { id, username, date };
  return session;
};

const loginPage = `
<html>
    <head>
      <title>Login</title>
    </head>
    <body>
      <form action="/login" method="post">
        <div><label for="username">username : </label>
          <input type="text" name="username" id="username">
        </div><br/>
        <div><label for="password">Password : </label>
          <input type="password" name="password" id="password">
        </div><br/>
        <div><input type="submit" value="Login"></div>
      </form>
    </body>
</html>`;

const isRegistered = (loginUsername, loginPassword, users) => {
  return users.find(({ username, password }) => {
    return username === loginUsername && password === loginPassword;
  });
};

const serveLoginPage = (req, res) => {
  res.set('Content-type', 'text/html');
  res.end(loginPage);
};

const userLogin = (users, sessions) => (req, res, next) => {
  const { username, password } = req.body;
  if (!isRegistered(username, password, users)) {
    res.end('Please Register Your Details');
    return;
  }
  const session = createSession(username, password);
  sessions[session.id] = session;

  res.set('Set-Cookie', `id=${session.id}`);
  res.redirect(302, '/guest-book');
  res.end();
};

module.exports = { serveLoginPage, userLogin };
