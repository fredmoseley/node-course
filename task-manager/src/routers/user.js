const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
// const cors = require('cors');

// router.options('*', cors());

//CREATE
router.post('/users', async (req, res) => {
  //will do my validation for me
  const user = new User(req.body);

  try {
    await user.save();
    //this line only executes if await sucessful
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//LOGIN
// router.options('/users/login', cors()); // enable pre-flight request for DELETE request
router.post('/users/login', async (req, res) => {
  try {
    console.log('In log in route');
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    //odd I had to use await not sure why.
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//LOGOUT
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

//LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    //wipe all tokens
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res(500).send(err.message);
  }
});

//
//READ ME
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// //READ ONE
// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

//UPDATE user
router.patch('/users/me', auth, async (req, res) => {
  //Can only update existing fields
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    //manually update fields
    updates.forEach((update) => (req.user[update] = req.body[update]));
    req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//DELETE
router.delete('/users/me', auth, async (req, res) => {
  const _id = req.user._id;

  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
//DELETE
router.delete('/users/me', auth, async (req, res) => {
  const _id = req.user._id;

  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
