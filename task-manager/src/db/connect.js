//mongoose uses mondb behind the scenes;
const mongoose = require('mongoose');

//connect to mongodb to the task-manager-api collection
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
