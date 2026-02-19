const { User } = require('../models');

const userData = [
      {
        id: 1,
        username: 'JohnDoe',
        user_email: 'johndoe@gmail.com',
        user_created: new Date(),
        password: '$2b$10$RJT./VUfRjHKBcIELMkekODIk5CHzqJwRojkUVk4vUBZvkah67sCy',
      },
      {
        id: 2,
        username: 'JaneDoe',
        user_email: 'janedoe@gmail.com',
        user_created: new Date(),
        password: '$2b$10$RJT./VUfRjHKBcIELMkekODIk5CHzqJwRojkUVk4vUBZvkah67sCy',
      },
      {
        id: 3,
        username: 'Tammy',
        user_email: 'tammy@gmail.com',
        user_created: new Date(),
        password: '$2b$10$RJT./VUfRjHKBcIELMkekODIk5CHzqJwRojkUVk4vUBZvkah67sCy',
      },
    ];

    const seedUsers = () => User.bulkCreate(userData);

    module.exports = seedUsers;