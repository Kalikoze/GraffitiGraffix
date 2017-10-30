const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/users', (request, response) => {
  return db('users').select()
    .then(users => response.status(200).json(users))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/users/:id', (request, response) => {
  const id = request.params;

  return db('users').where(id).select()
    .then(user => !user.length ? response.status(404).json({ error: 'User could not be found.' }) : response.status(200).json(user))
})

app.get('/api/v1/images', (request, response) => {
  return db('images').select()
    .then(images => response.status(200).json(images))
    .catch(error => response.status(500).json({ error }));
})

app.get('/api/v1/images/:user_id', (request, response) => {
  const user_id = request.params;

  return db('images').where(user_id).select()
    .then(image => !image.length ? response.status(404).json({ error: 'No images found for this user' }) : response.status(200).json(image))
})

app.get('/api/v1/comments/:image_id', (request, response) => {
  const image_id = request.params;

  return db('comments').where(image_id).select()
    .then(comment => !comment.length ? response.status(404).json({ error: 'Image could not be found.' }) : response.status(200).json(comment))
})

app.get('/api/v1/followers/:artist_id', (request, response) => {
  const artist_id = request.params;

  return db('followers').where(artist_id).select()
    .then(follower => !follower.length ? response.status(404).json({ error: 'User could not be found.' }) : response.status(200).json(follower))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
