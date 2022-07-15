const request = require('supertest');
const { myApp } = require('../src/app.js');

const sessions = {};
const config = {
  guestbook: 'test/resources/comments.json',
  path: 'public',
  templateFile: 'resources/guest-book.html',
  userDetails: 'test/resources/userDetails.json'
};

const app = myApp(config, sessions);

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

  it('Should get 200 and success text for POST /signup', done => {
    request(app)
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

  it('Should get error message for unknown username and password', done => {
    request(app)
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

describe('serveStaticFile', () => {
  it('Should serve html file wth status code 200', done => {
    request(app)
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
    request(app)
      .get('/sourav')
      .expect('Content-type', /html/)
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
