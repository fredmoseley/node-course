//mongoose uses mondb behind the scenes;
const mongoose = require('mongoose');
const validator = require('validator');

//connect to mongodb to the task-manager-api collection
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

//define model
const User = mongoose.model('User', {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
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
  }
});

//create new model
// const me = new User({
//   name: encodeURIComponent('<script>alert("Hello Alert")</script>'),
//   email: 'Dan@dandan.com',
//   age: 21,
//   password: '  passing  '
// });

// //save model to db
// me.save()
//   .then((res) => console.log(me))
//   .catch((err) => console.log(err));

const Task = mongoose.model('Task', {
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false }
});

const task = new Task({
  description: 'Go for a walk'
});

task
  .save()
  .then((res) => console.log(task))
  .catch((error) => console.log(error));
