const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route for homepage that shows all posts if the user is logged in
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));

    const userData = await User.findAll();
    const user = userData.map((user) => user.get({ plain: true }));

    let currentuser = null;
    let user_id = null;

    if (req.session.logged_in) {
      user_id = req.session.user_id;
      currentuser = await User.findByPk(user_id);
    }

    res.render('homepage', {
      posts,
      currentuser: currentuser ? currentuser.username : null,
      user,
      user_id,
      logged_in: req.session.logged_in || false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This route is sends people home if they're already logged in and sends them to the login page if they aren't
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// GET new post form page
router.get('/new', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
} else {
  try {
    console.log('get /new______--______---_______-______')
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    const user_id =req.session.user_id;
    console.log(user_id,'------------------')
    console.log('get___________________________')
  res.render('newpost', {
    user_id,
    user,
    logged_in: true
  });
} catch (err) {
  console.log('MEGA ERROR_________-----___---__-__--_--__')
  res.status(500).json(err);
}}
});

module.exports = router;