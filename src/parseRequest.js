const parseRequestLine = line => {
  const params = {};
  const [method, rawUri, httpVersion] = line.split(' ');
  const [uri, queryParams] = rawUri.split('?');
  if (queryParams) {
    const parameters = queryParams.split('&');
    parameters.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
    })
  }
  return { method, uri, ...params, httpVersion };
};

const parseLine = line => {
  const indexOfSeparator = line.indexOf(':');
  const key = line.slice(0, indexOfSeparator).trim();
  const value = line.slice(indexOfSeparator + 1).trim();
  return [key.toLowerCase(), value];
};

const parseHeaders = lines => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = parseLine(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequest = chunk => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequestLine, parseLine, parseHeaders, parseRequest };
