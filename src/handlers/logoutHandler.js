const logoutHandler = sessions => (req, res, next) => {
  const { id } = req.cookies;
  const { pathname } = req.url;

  if (pathname !== '/logout') {
    next();
    return;
  }
  delete sessions[req.session[id]];
  res.setHeader('Set-Cookie', `id=${id};max-age=0`);
  res.end('Logged Out Successfully');
};

module.exports = { logoutHandler };
