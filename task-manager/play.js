//This is code from index.js that was used to illustrate concepts in a smaller scale
// I moved here to clean up my code.

// const Task = require('./models/task');
// const User = require('./models/user');

//User to task
//Will return an array
// const main = async () => {
//   const user = await User.findById('5eebe066389a30697a0554ab');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };

//Task to user
// const main = async () => {
//   const task = await Task.findById('5eebe06e389a30697a0554ad');
//   await task.populate('owner').execPopulate();
//   console.log(task.owner);
// };

// main();

// const pet = {
//   name: 'Hal'
// };
// pet.toJSON = function () {
//   console.log('called toJSON');
//   console.log(this);
//   return this;
// };

// console.log('call stringify:', JSON.stringify(pet));
//res.send calls JSON.stringify

//Without middleware: new quest -> run route handler
//With middleware: new request -> do something -> run route handlers

// const jwt = require('jsonwebtoken');
// const myFunc = async () => {
//   //first argument - unique identifier for the user.
//   //second argument is the secret used to a sign a token.  To make sure it has not been tampered with.
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
//     expiresIn: '1 day'
//   });
//   console.log(token);

//   const data = jwt.verify(token, 'thisismynewcourse');
//   console.log(data);
// };
// myFunc();
// const bcrypt = require('bcryptjs');
// const myFunction = async () => {
//   const password = 'Red12345';
//   //arguments are password and salt which is the number times to run hash algorithm.
//   //the higher the number the more secure.  The longer it takes to run. 8 is recommended
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare('red12345', hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

// //File upload using multer
// const multer = require('multer');
// //can configure by type of upload
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000 //1MB number in bytes
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please upload a Word document'));
//     }
//     cb(undefined, true); //accepts upload
//   }
// });

// //upload route
// app.post(
//   '/upload',
//   upload.single('upload'),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
