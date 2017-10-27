
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('followers').del()
    .then(() => {
      // Inserts seed entries
      return knex('followers').insert([
        {
          id: 1,
          follower_id: 1,
          artist_id: 2
        },
        {
          id: 2,
          follower_id: 1,
          artist_id: 3,
        },
        {
          id: 3,
          follower_id: 2,
          artist_id: 1
        }
      ]);
    });
};
