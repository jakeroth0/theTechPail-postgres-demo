const router = require("express").Router();
const sequelize = require("sequelize");
const bcrypt = require('bcrypt');

const { User, Post, Comment } = require("../../models");

// CREATE a new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body, {
        hooks: true
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log('Successfully signed up and logged in----------------------------');
      res.redirect('/');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//     res.status(200).json(userData);
//     // res.render('signup', {
//     //     user,
//     //     logged_in: true
//     // })
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// PUT update a user
// sending data to find an existing user
router.post('/login', async (req, res) => {
    try {
      // we search the DB for a user with the provided email
      const userData = await User.findOne({ where: { user_email: req.body.user_email }});
      if (!userData) {
        // the error message shouldn't specify if the login failed because of wrong email or password
        res.status(400).json({ message: 'Login failed. Please try again!' });
        return;
      }
      // use `bcrypt.compare()` to compare the provided password and the hashed password
      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // if they do not match, return error message
      if (!validPassword) {
        res.status(400).json({ message: 'Login failed. Please try again!' });
        return;
      }
      // This is where the session object is defined. this object sets the user_id
      req.session.save(()=> {
        req.session.user_id = userData.id;
        const user = userData.get({ plain: true});
        console.log(req.session.user_id);
        req.session.logged_in = true;
        res.redirect('/');
        // res.json({ user: userData, message: "You are now logged in!"})
      });
      
      console.log('after render');
    //   // if they do match, return success message
    //   res.status(200).json({ message: 'You are now logged in!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   GET all users
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one user and view their profile
router.get('/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const userData = await User.findByPk(req.params.id, {
                attributes: ['username'],
                include: [
                    {
                        model: Post,
                        attributes: ['post_title', 'post_date', 'id'],
                    }
                ]
            });
            const user = userData.get({ plain: true });
            console.log(user);
            // res.status(200).json(userData);
            res.render('profile', {
                user,
                logged_in: true
            })
        } catch (err) {
            res.status(500).json(err);
        }}
});

// GET one user and view their profile
router.get('/profile/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
    } else {
        try {
            const userData = await User.findByPk(req.session.user_id, {
                attributes: {exclude: ['password']},
                include: [
                    {
                        model: Post,
                        attributes: ['post_title', 'post_date', 'id'],
                    }
                ]
            });
            const user = userData.get({ plain: true });
            console.log(user);
            // res.status(200).json(userData);
            res.render('ownprofile', {
                user,
                logged_in: true
            })
        } catch (err) {
            res.status(500).json(err);
        }}
});

//   POST to logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// POST seed users
router.post('/seed', (req, res) => {
  User.bulkCreate([
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
  ]).then(() => {
    res.send('Seeded users succesfully!');
  });
});

module.exports = router;