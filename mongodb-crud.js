//CRUD

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const { MongoClient, ObjectID } = require('mongodb');
const connectionUrl = 'mongodb://127.0.0.1:27017'; //using local host slows down your app
const databaseName = 'task-manager'; //mongo will auto create

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    //callback.  will return error or client
    if (error) {
      return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);

    //CREATE
    // db.collection('users').insertOne(
    //   { name: 'Sydney', age: 20 },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user');
    //     }
    //     //result.ops is array of inserted documents
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     { name: "Jen", age: 28 },
    //     { name: "Gunter", age: 27 }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    //READ
    // db.collection('users').findOne(
    //   { _id: new ObjectID('5edff378f1d09c01f10e3555') },
    //   (error, user) => {
    //     if (error) return console.log('Unable to find user ' + user.name);
    //     console.log(user);
    //   }
    // );

    // READ DOCUMENTS
    // db.collection('tasks').findOne(
    //   { _id: new ObjectID('5edd41bf47e3fcd5c6c9145f') },
    //   (error, task) => {
    //     if (error) return console.log('Could not find last task');
    //     console.log(task);
    //   }
    // );

    //find returns a cursor
    //does not use a callback
    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     if (error) return console.log('All tasks are completed');
    //     console.log(tasks);
    //   });

    //UPDATE
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('5edff378f1d09c01f10e3554')
    //     },
    //     {
    //       $set: {
    //         name: 'Fred'
    //       }
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('tasks')
    //   .updateMany({ completed: false }, { $set: { completed: true } })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    //DELETE
    // db.collection('users')
    //   .deleteMany({ age: 30 })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    db.collection('tasks')
      .deleteOne({ description: 'Study' })
      .then((res) => console.log(res.result))
      .catch((err) => console.log(err));
  }
);
