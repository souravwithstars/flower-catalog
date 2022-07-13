const request = require('supertest');
const { app } = require('../src/app.js');

const config = {
  guestbook: 'test/resources/comments.json',
  path: './public',
  templateFile: 'public/guest-book.html',
  userDetails: 'test/resources/userDetails.json'
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

  it('Should get 200 and success text for POST /signup', done => {
    request(myApp)
      .post('/signup')
      .expect('Registered Successfully!!')
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

  it('Should get error message for unknown username and password', done => {
    request(myApp)
      .post('/login')
      .send('username=Sourav&password=5678')
      .expect('Please Register Your Details')
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

describe('serveStaticFile', () => {
  it('Should serve html file wth status code 200', done => {
    request(myApp)
      .get('/')
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

describe('notFoundHandler', () => {
  it('Should get status code 404 for unknown request', done => {
    request(myApp)
      .get('/sourav')
      .expect('Content-type', 'text/plain')
      .expect('/sourav not found')
      .expect(404)
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
