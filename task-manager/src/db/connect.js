//mongoose uses mondb behind the scenes;
const mongoose = require('mongoose');

//connect to mongodb to the task-manager-api collection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
