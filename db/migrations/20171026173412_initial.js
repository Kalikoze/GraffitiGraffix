exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('username');
      table.string('tag');
      table.string('shortBio');
      table.integer('followersCount');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('images', table => {
      table.increments('id').primary();
      table.string('url');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('comments', table => {
      table.increments('id').primary();
      table.string('comment');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('image_id').unsigned();
      table.foreign('image_id').references('images.id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('followers', table => {
      table.increments('id').primary();
      table.integer('follower_id');
      table.integer('artist_id');
      table.foreign('follower_id').references('users.id');
      table.foreign('artist_id').references('users.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('followers'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('images'),
    knex.schema.dropTable('users')
  ]);
};
