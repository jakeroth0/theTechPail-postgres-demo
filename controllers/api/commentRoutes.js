const router = require("express").Router();
const sequelize = require("sequelize");
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/seed', (req, res) => {
    Comment.bulkCreate([
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
    ]).then(() => {
        res.send('Comments seeded succesfully!');
    });
});

module.exports = router;