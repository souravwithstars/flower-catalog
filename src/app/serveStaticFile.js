const fs = require("fs");

const getType = filename => {
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

const serveFile = (request, response, filename) => {
  const content = fs.readFileSync(filename);
  const contentType = request.getType(filename);
  response.setHeader('Content-type', contentType);
  response.end(content);
};

const staticFileHandle = (request, response) => {
  let { url } = request;
  if (request.matches('GET', '/')) {
    url = '/flower-catalog.html';
  }

  const filename = './public' + url;
  if (fs.existsSync(filename)) {
    request.getType = getType;
    serveFile(request, response, filename);
    return true;
  }
  return false;
};

module.exports = { staticFileHandle, getType };
