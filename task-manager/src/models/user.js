const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number.');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('password cannnot contain "password"');
        }
      }
    },
    tokens: [
      {
        token: { type: String, required: true }
      }
    ],
    avatar: { type: Buffer }
  },
  {
    timestamps: true
  }
);

//Virtual attribute - not stored in the db
//A relationship between 2 entities
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', //User field Task model uses

  foreignField: 'owner' //field on Task model
});

//accessible on the model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login.');
  }
  return user;
};

//will be on the instance - instance methods
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
  //we are saving token on request
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//overriding the instance toJSON method
//this method is called automatically
userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  
  //deleting avatar because it is large and will slow down profile request
  //we have a separate url to serve it
  delete userObject.avatar;

  return userObject;
};

userSchema.pre('save', async function (next) {
  const user = this; //the document that will be saved
  //has the password been modified since
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
