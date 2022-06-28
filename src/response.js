const statusMessages = {
  200: 'OK',
  302: 'REDIRECT',
  404: 'NOT FOUND'
};

const EOL = '\r\n';

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  addHeader(field, value) {
    this.#headers[field] = value;
  }

  #responseStatus() {
    const version = 'HTTP/1.1';
    const statusMessage = statusMessages[this.#statusCode];
    return [version, this.#statusCode, statusMessage].join(' ') + EOL;
  }

  #write(content) {
    this.#socket.write(content);
  }

  #writeHeaders() {
    this.#write(this.#responseStatus());

    Object.entries(this.#headers).forEach(([field, value]) => {
      this.#write(`${field}: ${value}${EOL}`);
    })
  }

  send(message) {
    this.addHeader('Content-length', message.length);
    this.#writeHeaders();
    this.#write(EOL);
    this.#write(message);
    this.#socket.end();
  }
}

exports.Response = Response;
