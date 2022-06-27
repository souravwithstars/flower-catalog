const fs = require("fs");

const extensions = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  html: 'text/html'
};

const getType = fileName => {
  const extension = fileName.slice(fileName.lastIndexOf('.') + 1);
  return extensions[extension] || 'text/plain';
};

const handler = (request, response) => {
  const { uri } = request;
  if (uri === '/') {
    uri = '/flowerCatalog.html';
  }
  const filename = `./html${uri}`;
  if (fs.existsSync(filename)) {
    const content = fs.readFileSync(filename);
    const contentType = getType(content);
    response.addHeader('Content-type', contentType);
    response.send(content);
    return true;
  }
  return;
};

module.exports = { handler };
