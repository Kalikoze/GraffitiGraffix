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
    const run = true;
    run.should.equal(true);
  });
});

describe('DELETE endpoints', () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => error);
  });

  beforeEach(done => {
    database.seed
      .run()
      .then(() => {
        done();
      })
      .catch(error => error);
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user with a given id', done => {
      chai.request(server).get('/api/v1/users').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);

        chai
          .request(server)
          .delete('/api/v1/users/1')
          .end((error, response) => {
            response.should.have.status(204);

            chai.request(server).get('/api/v1/users').end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(2);
              done();
            });
          });
      });
    });

    it('should delete user comments if that user is deleted', done => {
      chai.request(server).delete('/api/v1/users/1').end((error, response) => {
        response.should.have.status(204);

        chai
          .request(server)
          .get('/api/v1/comments/1')
          .end((error, response) => {
            response.should.have.status(404);
            response.body.error.should.equal(
              'Comments for this image could not be found.'
            );
            done();
          });
      });
    });

    it('should delete user images if that user is deleted', done => {
      chai.request(server).delete('/api/v1/users/1').end((error, response) => {
        response.should.have.status(204);

        chai.request(server).get('/api/v1/images/1').end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('No images found for this user');
          done();
        });
      });
    });

    it('should delete user followers if that user is deleted', done => {
      chai.request(server).delete('/api/v1/users/1').end((error, response) => {
        response.should.have.status(204);

        chai
          .request(server)
          .get('/api/v1/followers/1')
          .end((error, response) => {
            response.should.have.status(404);
            response.body.error.should.equal('User could not be found.');
            done();
          });
      });
    });

    it('should not delete a user if no id is found', done => {
      chai.request(server).get('/api/v1/users').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);

        chai
          .request(server)
          .delete('/api/v1/users/4')
          .end((error, response) => {
            response.should.have.status(404);
            response.body.error.should.equal('No user to delete with id of 4');

            chai.request(server).get('/api/v1/users').end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(3);
              done();
            });
          });
      });
    });
  });

  describe('DELETE /api/v1/images/:id', () => {
    it('should delete an image with a given id', done => {
      chai.request(server).get('/api/v1/images').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);

        chai
          .request(server)
          .delete('/api/v1/images/1')
          .end((error, response) => {
            response.should.have.status(204);

            chai
              .request(server)
              .get('/api/v1/images')
              .end((error, response) => {
                response.should.have.status(200);
                response.body.length.should.equal(2);
                done();
              });
          });
      });
    });

    it('should delete comments if an image is deleted', done => {
      chai.request(server).delete('/api/v1/images/1').end((error, response) => {
        response.should.have.status(204);

        chai
          .request(server)
          .get('/api/v1/comments/1')
          .end((error, response) => {
            response.should.have.status(404);
            response.body.error.should.equal(
              'Comments for this image could not be found.'
            );
            done();
          });
      });
    });

    it('should not delete an image if no id is found', done => {
      chai.request(server).get('/api/v1/images').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);

        chai
          .request(server)
          .delete('/api/v1/images/4')
          .end((error, response) => {
            response.should.have.status(404);
            response.body.error.should.equal('No image to delete with id of 4');

            chai
              .request(server)
              .get('/api/v1/images')
              .end((error, response) => {
                response.should.have.status(200);
                response.body.length.should.equal(3);
                done();
              });
          });
      });
    });
  });

  describe('DELETE /api/v1/comments/:id', () => {
    it('should delete a comment with a given id', done => {
      chai.request(server).get('/api/v1/comments/1').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(3);

        chai
          .request(server)
          .delete('/api/v1/comments/1')
          .end((error, response) => {
            response.should.have.status(204);

            chai
              .request(server)
              .get('/api/v1/comments/1')
              .end((error, response) => {
                response.should.have.status(200);
                response.body.length.should.equal(2);
                done();
              });
          });
      });
    });

    it('should not delete a comment if no id is found', done => {
      chai
        .request(server)
        .delete('/api/v1/comments/4')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('No comment to delete with id of 4');
          done();
        });
    });
  });

  describe('DELETE /api/v1/followers/:artist_id/:follower_id', () => {
    it('should delete a follower with a given artist and follower id', done => {
      chai.request(server).get('/api/v1/followers/2').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(1);

        chai
          .request(server)
          .delete('/api/v1/followers/2/1')
          .end((error, response) => {
            response.should.have.status(204);

            chai
              .request(server)
              .get('/api/v1/followers/2')
              .end((error, response) => {
                response.should.have.status(404);
                response.body.error.should.equal('User could not be found.');
                done();
              });
          });
      });
    });

    it('should not delete a follower if no id is found', done => {
      chai
        .request(server)
        .delete('/api/v1/followers/1/4')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal(
            'No follower to delete with id of 4'
          );

          done();
        });
    });
  });
});
