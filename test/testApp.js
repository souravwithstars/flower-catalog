const request = require('supertest');
const { app } = require('../src/app.js');

const config = {
  guestbook: 'public/comments.json',
  path: './public',
  templateFile: 'public/guest-book.html',
  userDetails: 'public/userDetails.json'
};

const sessions = {};

const myApp = app(config, sessions);

describe('signUpHandler', () => {
  it('Should get status code 200 for GET /signup', done => {
    request(myApp)
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
    request(myApp)
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
    request(myApp)
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
    request(myApp)
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

