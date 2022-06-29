const http = require('http');

const createHandlers = (...handlers) => (request, response) => {
  for (const handler of handlers) {
    if (handler(request, response)) {
      return true;
    }
  }
  return false;
}

const matches = function (method, pathname) {
  const url = new URL(this.url, `https://${this.headers.host}`);
  this.url = url;

  return this.url.pathname === pathname && this.method === method;
};

const startServer = function (port, handlers) {
  const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    req.matches = matches.bind(req);
    handlers(req, res);
  });

  server.listen(port, () => console.log(`Listen to the port : ${port}`));
};

module.exports = { startServer, createHandlers };
