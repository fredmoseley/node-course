const express = require('express');
const router = new express.Router();
const User = require('../models/user');
//CREATE
router.post('/users', async (req, res) => {
  //will do my validation for me
  const user = new User(req.body);

  try {
    await user.save();
    //this line only executes if sucessful
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//READ ALL
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//READ ONE
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//UPDATE user
router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
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
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send(`There was not user with id ${_id}`);
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//DELETE
router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404).send(`The user did not exist id: ${_id}`);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
