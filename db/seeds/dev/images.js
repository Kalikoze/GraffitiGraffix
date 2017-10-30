
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(() => {
      // Inserts seed entries
      return knex('images').insert([
        {
          id: 1,
          url: 'http://i232.photobucket.com/albums/ee10/anthonyscaperrotta1225/graffiti-1.jpg',
          user_id: 1
        },
        {
          id: 2,
          url: 'http://milak.co.uk/wp-content/uploads/2013/11/tumblr_mvjr77JXYP1r55y3po1_1280.jpg',
          user_id: 1
        },
        {
          id: 3,
          url: 'http://milak.co.uk/wp-content/uploads/2013/11/tumblr_mvjr77JXYP1r55y3po1_1280.jpg',
          user_id: 2,
        }
      ]);
    });
};
