const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); //retrieve auth token from header
    const decoded = jwt.verify(token, 'thisismynewcourse'); //validate user token
    //find user
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });
    //cannot find user throw an error
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user; //add the user to the request
    next();
  } catch (error) {
    res.status(401).send('error: Please authenticate.');
  }
};

module.exports = auth;
