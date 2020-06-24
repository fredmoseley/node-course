const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const auth = require('../middleware/auth');
const User = require('../models/user');

const router = new express.Router();

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

//UPDATE
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
    await req.user.save();
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

const upload = new multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image.'));
    }
    cb(undefined, true);
  }
});

//UPLOAD AVATAR
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//DELETE AVATARS
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
