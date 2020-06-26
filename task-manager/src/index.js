const express = require('express');
const cors = require('cors');
//connect to db
require('./db/connect');

const fs = require('fs');
const https = require('https');
const path = require('path');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// https
//   .createServer(
//     {
//       key: fs.readFileSync(
//         path.join(__dirname, '../server/ssl-cert/server.key')
//       ),
//       cert: fs.readFileSync(
//         path.join(__dirname, '../server/ssl-cert/server.crt')
//       ),
//       passphrase: 'random madness define King ego'
//     },
//     app
//   )
//   .listen(3000);
