const mockUsers = require('../MockSeedData/MockUserData');
const mockImages = require('../MockSeedData/MockImageData');
const mockComments = require('../MockSeedData/MockCommentData');
const mockFollowers = require('../MockSeedData/MockFollowerData');

const createUser = (knex, user) => {
  return knex('users').insert(user);
};

const createImage = (knex, image) => {
  return knex('images').insert(image);
};

const createComment = (knex, comment) => {
  return knex('comments').insert(comment);
};

const createFollower = (knex, follower) => {
  return knex('followers').insert(follower);
};

exports.seed = (knex, Promise) => {
  return knex('users')
    .del()
    .then(() => knex('images').del())
    .then(() => knex('comments').del())
    .then(() => knex('followers').del())
    .then(() => {
      let userPromises = [];
      mockUsers.forEach(user => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .then(() => {
      let imagePromises = [];

      mockImages.forEach(image => {
        imagePromises.push(createImage(knex, image));
      });
      return Promise.all(imagePromises);
    })
    .then(() => {
      let commentPromises = [];

      mockComments.forEach(comment => {
        commentPromises.push(createComment(knex, comment));
      });
      return Promise.all(commentPromises);
    })
    .then(() => {
      let followerPromises = [];

      mockFollowers.forEach(follower => {
        followerPromises.push(createFollower(knex, follower));
      });
      return Promise.all(followerPromises);
    })
    .then(() => console.log('Seeding is complete.'))
    .catch(error => {
      console.log(`Error seeding data: ${error}`);
    });
};
