const logoutHandler = sessions => (req, res) => {
  const { id } = req.cookies;
  delete sessions[req.session[id]];
  res.setHeader('Set-Cookie', `id=${id};max-age=0`);
  res.end('Logged Out Successfully');
};

module.exports = { logoutHandler };
