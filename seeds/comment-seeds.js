const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Great post!',
    user_id: 2,
    comment_date: new Date(),
    post_id: 1
  },
  {
    comment_text: 'I agree with you.',
    user_id: 1,
    comment_date: new Date(),
    post_id: 1
  },
  {
    comment_text: 'This is very helpful.',
    user_id: 2,
    comment_date: new Date(),
    post_id: 2
  },
];

    const seedComments = () => Comment.bulkCreate(commentData);

    module.exports = seedComments;