const router = require("express").Router();
const sequelize = require("sequelize");
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');
const { User, Comment, Post } = require("../../models");

// GET one post
router.get('/:id', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const postData = await Post.findByPk(req.params.id, {
                attributes: ['post_title', 'post_text', 'post_date'],
                include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                }, 
                {
                    model: Comment,
                    attributes:['comment_text', 'comment_date'],
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                            nested: true
                        }],
                        nested: true
                        // these nested's may need to be removed
                }]
            });
            const userData = await User.findByPk(req.session.user_id, {
                attributes: {exclude: ['password']},
                include: [
                    {
                        model: Post,
                        attributes: ['post_title', 'post_date', 'user_id'],
                    }
                ]
            })
            const post = postData.get({ plain: true });
            const post_user_id = post.user.id
            const user = userData.get({ plain: true })
            const user_id = user.id;
            const isPostOwner = user_id == post_user_id;
            console.log('is the current user the posts owner t/f-------------------------------------------------')
            console.log(post_user_id)
            console.log(user_id)
            console.log(isPostOwner)
            console.log('req.session.user_id')
            console.log(req.session.user_id)
            console.log(post);
            res.render('onepost', {
                post,
                user_id,
                isPostOwner,
                post_id: req.params.id,
                user,
                logged_in: true
            })
            // res.status(200).json(postData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
})

// POST a new blog post
router.post('/new', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const postData = await Post.create({
                ...req.body,
                user_id: req.session.user_id // Add the user_id from the session to the new post data
            }, {
                include: [
                    {
                      model: User,
                      attributes: {include: ['username']},
                    }
                ]
            });
            res.status(200).json(postData);
        } catch (err) {
            res.status(400).json(err);
        }
    }
})

// GET edit post form page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      // Find the post by id

      const postData = await Post.findByPk(req.params.id, {
        attributes: ['post_title', 'post_text', 'post_date', 'id'],
        include: [
        {
            model: User,
            attributes: ['username','id']
        }, 
        {
            model: Comment,
            attributes:['comment_text', 'comment_date'],
            include: [
                {
                    model: User,
                    attributes: ['username','id'],
                    nested: true
                }],
                nested: true
                // these nested's may need to be removed
        }]
    });
    const post = postData.get({ plain: true });
      // this fetches all users
      
      console.log('the post.post_id is below-------');
      console.log(post.id);
      console.log(post.user.id)
      console.log('above is the post.user.id__________')
      // Check if the logged in user is the owner of the post
      if (post.user.id !== req.session.user_id) {
        res.status(403).json({ message: 'You are not authorized to edit this post.' });
        return;
      }
      const user_id =req.session.user_id;
      // Render the edit post form
      res.render('editpost',
       { post,
        user_id,
        logged_in: true
     });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // PUT update post
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id);
      const post = postData.get({ plain: true });
      const userData = await User.findByPk(req.session.user_id);
      const user = userData.get({ plain: true });
      const user_id = user.id;
      console.log('this is the user')
      console.log(user);
      console.log('this is the post')
      console.log(post);
      if (!post) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      if (post.user_id !== req.session.user_id) {
        res.status(403).json({ message: 'You do not have permission to edit this post!' });
        return;
      }
      const updatedPost = await Post.update({
        post_title: req.body.post_title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );

      res.render('onepost', {
        post,
        user,
        user_id,
        logged_in: true
      });
      // res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // POST a new comment
router.post('/:id', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
      res.redirect('/');
  } else {
      try {
          const commentData = await Comment.create({
              ...req.body,
              user_id: req.session.user_id,
              post_id: req.params.id
          },
          {
              include: [
                  {
                      model: User,
                      attributes: ['username', 'id']
                  },
                  {
                      model: Post
                  }
              ]
          });
          res.status(200).json(commentData);
      } catch (err) {
          res.status(400).json(err);
      }
  }
})

// POST seed all of the posts
router.post('/seed', (req, res) => {
    Post.bulkCreate([
        {
            post_title: 'First Post',
            post_date: new Date(),
            user_id: 1,
            post_text: 'This is my first post on jog-social.',
          },
          {
            post_title: 'Second Post',
            post_date: new Date(),
            user_id: 2,
            post_text: 'I am excited to share my thoughts on jog-social.',
          },
          {
            post_title: 'Third Post',
            post_date: new Date(),
            user_id: 3,
            post_text: 'I hope you enjoy reading my latest post.',
          },  
    ]).then(() => {
        res.send('Seeded posts succesfully!');
    });
});

// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Find the post by id
      const postData = await Post.findByPk(req.params.id);
      const post = postData.get({ plain: true });
  
      // Check if the logged in user is the owner of the post
      if (post.user_id !== req.session.user_id) {
        res.status(403).json({ message: 'You are not authorized to delete this post.' });
        return;
      }
  
      // Delete the post
      await postData.destroy();
  
      res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;