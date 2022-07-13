const request = require('supertest');
const { createRouter, notFoundHandler } = require('server');
const { parseUrlSearchParams } = require('../src/handlers/parseUrlSearchParams.js');
const { receiveBodyParams } = require('../src/handlers/parseBodyParams.js');
const { parseParams } = require('../src/handlers/parseParams.js');
const { logRequest } = require('../src/handlers/logRequest.js');
const { injectCookies } = require('../src/handlers/injectCookies.js');
const { injectSession } = require('../src/handlers/injectSession.js');
const { signUpHandler } = require('../src/handlers/signupHandler.js');
const { loginHandler } = require('../src/handlers/loginHandler.js');
const { logoutHandler } = require('../src/handlers/logoutHandler.js');
const { guestBookRouter } = require('../src/handlers/guestBookRouter.js');
const { serveStatic } = require('../src/server/serveStatic.js');
const { apiHandler } = require('../src/handlers/serveApis/apiHandler.js');

const sessions = {};
const users = [{ "username": "Sourav", "password": "1234" }];
const comments = [{ "comment": "Beautiful", "name": "Sourav", "date": "13/07/2022, 10:34:05" }];
const path = './public'

const handlers = [parseUrlSearchParams, receiveBodyParams, parseParams, logRequest, injectCookies, injectSession(sessions), signUpHandler(users), loginHandler(users, sessions), logoutHandler(sessions), guestBookRouter(comments), serveStatic(path), apiHandler, notFoundHandler];

const app = createRouter(...handlers);

describe('signUpHandler', () => {
  it('Should get status code 200 for GET /signup', done => {
    request(app)
      .get('/signup')
      .expect('Content-type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
        return;
      })
  });
});

describe('loginHandler', () => {
  it('Should get status code 200 for GET /login', done => {
    request(app)
      .get('/login')
      .expect('Content-type', /html/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
        return;
      })
  });
});

describe('apiHandler', () => {
  it('Should get status code 200 and comments as json format', done => {
    request(app)
      .get('/api.comments')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
        return;
      })
  });

  it('Should get status code 200 and comments of particular given name', done => {
    request(app)
      .get('/api.search')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
        return;
      })
  })
});

