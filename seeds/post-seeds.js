const { Post } = require('../models');

const postData = [
  {
    post_title: 'First Post',
    post_date: new Date(),
    user_id: 1,
    post_text: 'This is my first post on TechPail.',
  },
  {
    post_title: 'Second Post',
    post_date: new Date(),
    user_id: 2,
    post_text: 'I am excited to share my thoughts on TechPail.',
  },
  {
    post_title: 'Third Post',
    post_date: new Date(),
    user_id: 3,
    post_text: 'I hope you enjoy reading my latest post.',
  },
];

    const seedPosts = () => Post.bulkCreate(postData);

    module.exports = seedPosts;