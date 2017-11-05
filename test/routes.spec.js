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
});
