const createSession = username => {
  const date = new Date();
  const id = date.getTime();
  const session = { id, username, date };
  return session;
};

const isRegistered = (loginUsername, loginPassword, users) => {
  return users.find(({ username, password }) => {
    return username === loginUsername && password === loginPassword;
  });
};

const serveLoginPage = (req, res, next) => {
  req.url = req.url + '.html';
  next();
};

const userLogin = (users, sessions) => (req, res, next) => {
  const { username, password } = req.body;
  if (!isRegistered(username, password, users)) {
    res.status(401);
    res.json({ login: false });
    return;
  }
  const session = createSession(username, password);
  sessions[session.id] = session;
  res.set('Set-Cookie', `id=${session.id}`);
  res.json({ login: true });
};

module.exports = { serveLoginPage, userLogin };
