const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  before(done => {
    db.migrate.latest()
    .then(() => done())
    .catch(error => error)
  })

  beforeEach((done) => {
    db.seed.run()
      .then(() => done())
      .catch(error => error);
  });

  describe('GET /api/v1/users', () => {
    it('should get all the users', done => {
      const mockData = {
        id: 2,
        name: 'David Becker',
        username: 'lilDevil',
        tag:
          'https://s-media-cache-ak0.pinimg.com/originals/9f/65/12/9f6512d4f5787662de0551654a2aec42.jpg',
        shortBio:
          "Tyler, also known as Tyler, came from the bayoouu south south-y Florida. Don't get near him when he is taggging. He might swallow you like a croc.",
        google_uid: '112233'
      }

      chai.request(server)
      .get('/api/v1/users')
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.id === mockData.id);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[index].should.include(mockData);
        done();
      });
    });

    it('should return a 404 status if the url is invalid', done => {
      chai.request(server)
      .get('/api/v1/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should get only one user', done => {
      const mockData = {
        id: 1,
        name: 'Travis Rollins',
        username: 'Kalikoze',
        tag:
          'https://s-media-cache-ak0.pinimg.com/originals/9f/65/12/9f6512d4f5787662de0551654a2aec42.jpg',
        shortBio:
          'Travis was born from the boiling hot liquid plains of Kansas. You can see his tags all across the Western Hemisphere.',
        google_uid: '1a2b3c'
      }

      chai.request(server)
      .get('/api/v1/users/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.include(mockData);
        done();
      });
    });

    it('should return a 404 error if the user does not exist', done => {
      chai.request(server)
      .get('/api/v1/users/4')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('User could not be found.')
        done();
      });
    });
  });

  describe('GET /api/v1/users/auth/:google_uid', () => {
    it('should get the user if a google id is put in the url params', done => {
      const mockData = {
        id: 1,
        name: 'Travis Rollins',
        username: 'Kalikoze',
        tag:
          'https://s-media-cache-ak0.pinimg.com/originals/9f/65/12/9f6512d4f5787662de0551654a2aec42.jpg',
        shortBio:
          'Travis was born from the boiling hot liquid plains of Kansas. You can see his tags all across the Western Hemisphere.',
        google_uid: '1a2b3c'
      }

      chai.request(server)
      .get('/api/v1/users/auth/1a2b3c')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.include(mockData);
        done();
      });
    });

    it('should return a 404 error if the google id does not exist', done => {
      chai.request(server)
      .get('/api/v1/users/auth/63jfa2')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Google UID could not be found.');
        done();
      });
    });
  });

  describe('GET /api/v1/images', () => {
    it('should get all of the images', done => {
      const mockData =   {
        id: 3,
        url:
          'http://milak.co.uk/wp-content/uploads/2013/11/tumblr_mvjr77JXYP1r55y3po1_1280.jpg',
        user_id: 2
      }

      chai.request(server)
      .get('/api/v1/images')
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.id === mockData.id);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[index].should.include(mockData);
        done();
      });
    });

    it('should return a 404 status if the url is invalid', done => {
      chai.request(server)
      .get('/api/v1/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/images/:user_id', () => {
    it('should return the images of a particular user', done => {
      const mockData = [
        {
          id: 1,
          url:
            'http://i232.photobucket.com/albums/ee10/anthonyscaperrotta1225/graffiti-1.jpg',
          user_id: 1
        },
        {
          id: 2,
          url:
            'https://graffitidiplomacy.files.wordpress.com/2016/06/star-tag-graffiti-diplomacy.jpg?w=385&h=297',
          user_id: 1
        }
      ]

      chai.request(server)
      .get('/api/v1/images/1')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.include(mockData[0]);
        response.body[1].should.include(mockData[1]);
        done();
      });
    });

    it('should return a 404 status if user is not found', done => {
      chai.request(server)
      .get('/api/v1/images/3')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('No images found for this user')
        done();
      });
    });
  });

  describe('GET /api/v1/comments/:image_id', () => {
    it('should get the comments for an image', done => {
      const mockData = {
        id: 3,
        comment: 'Dude bruh',
        user_id: 1,
        image_id: 1
      }

      chai.request(server)
      .get('/api/v1/comments/1')
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.id === mockData.id);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[index].should.include(mockData);
        done();
      });
    });

    it('should return a 404 error if there are no comments for that image', done => {
      chai.request(server)
      .get('/api/v1/comments/2')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal('Comments for this image could not be found.')
        done();
      })
    })
  });
});
