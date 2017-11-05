const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('test', () => {
  it('should run tests', () => {
    let neat = true;
    neat.should.equal(true);
  });
});

describe('PATCH /api/v1/users/:id', () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => console.log(error));
  });

  beforeEach(done => {
    database.seed
      .run()
      .then(() => {
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  it.skip('should patch a user with a specific id', done => {
    chai.request(server).get('/api/v1/users/1').end((error, response) => {
      console.log('body 1', response.body);
      response.body.name.should.equal('tyler');
      response.body.username.should.equal('neat');
      response.body.tag.should.equal('image.net');
      response.body.shortBio.should.equal('sweet');
      done();
    });
    chai
      .request(server)
      .patch('/api/v1/users/1')
      .send({
        name: 'Patched User',
        username: 'ChangedUsername',
        tag: 'image.net',
        shortBio: 'New bio'
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.name.should.equal('Patched User');
        response.body.username.should.equal('ChangedUsername');
        response.body.tag.should.equal('image.net');
        response.body.shortBio.should.equal('New bio');
        done();
      });

    chai.request(server).get('/api/v1/users/1').end((error, response) => {
      console.log('body 2', response.body);
      response.body.name.should.equal('Patched User');
      response.body.username.should.equal('ChangedUsername');
      response.body.tag.should.equal('image.net');
      response.body.shortBio.should.equal('New bio');
      done();
    });
  });

  it('should return the correct error if the request is missing a required key', done => {
    chai
      .request(server)
      .patch('/api/v1/users/2')
      .send({
        username: 'NewUsername',
        tag: 'updatedimage.com',
        shortBio: 'This is my new bio.'
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.error.should.equal(
          "Expected format: {'name': <string>, 'username': <string>, 'tag': <string>, 'shortBio': <string>}.  You are missing a name property."
        );
        done();
      });
  });
});
