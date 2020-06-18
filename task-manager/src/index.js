const express = require('express');
//connect to db
require('./db/connect');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   if (req.method === 'GET') {
//     console.log(req.method, req.path);
//     res.send('GET request are disabled');
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down.  Check back soon!');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

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
