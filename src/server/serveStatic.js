const fs = require('fs');

const getMimeType = filename => {
  const extensions = {
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    html: 'text/html',
    css: 'text/css'
  };
  const extension = filename.slice(filename.lastIndexOf('.') + 1);
  return extensions[extension] || 'text/plain';
};

const invalidRequest = (req, res) => {
  res.statusCode = 405;
  res.end('Invalid Request');
  return true;
};

const getFileName = ({ url }, path) => {
  const { pathname } = url;
  if (pathname === '/') {
    return path + '/flower-catalog.html';
  }
  return path + pathname;
};

const serveStatic = (path) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return invalidRequest(req, res);
    }

    const fileName = getFileName(req, path);
    try {
      const content = fs.readFileSync(fileName);
      res.setHeader('content-type', getMimeType(fileName));
      res.setHeader('content-length', content.length);
      res.end(content);
    } catch (error) {
      next();
    }
  };
};

module.exports = { serveStatic };
