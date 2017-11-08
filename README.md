# Graffiti Graffix

Graffiti Graffix is a social media platform for graffiti artists. We hope to connect graffiti artists to one another and create a stronger community surrounding this art form. This was a project developed for Module 4 in the Front-End Engineering program at Turing School for Software and Design. Credits: Travis Rollins, Tyler Hevia, and David Becker.

![GraffitiGraffix](https://media.giphy.com/media/3o6nUWpSz05dnNREJO/giphy.gif)

## Usage

This web application allows users to create a profile and add images of their graffiti work, follow other graffiti artists, and comment on other user's images. A user can also search and sort through user profiles alphabetically, by newest artists, and by popularity. We have also implemented a search feature, which allows users to look up a specific user.

## Setup

##### Clone repo
  - ```git clone https://github.com/Kalikoze/GraffitiGraffix.git```

##### NPM install
  - ```npm install```

##### NPM start
  - ```npm start```

##### Create a graffiti_graffix database using postgresQL
  - ```psql```
  - ```CREATE DATABASE graffiti_graffix;```

##### Migrate table schema using knex
  - ```knex migrate:latest```

##### Run server.js with node
  - ```node server.js```

##### Open in browser


## Tech

* React/Redux
* Node/Express
* Firebase Google Authorization
* CircleCI
* Jest/Enzyme/fetch-mock
* Mocha/Chai/Chai-http

## Next Steps

* Clicked Artist persists on refresh
* Editing a user profile
  - Tag
  - Bio
  - Username
* Remove user's images
* Responsiveness
* Maximize Images on Click
* Edit user comments
* Functionality of liking an image
* Default selection of tags
