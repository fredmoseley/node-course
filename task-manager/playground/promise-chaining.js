require('../src/db/connect');
const User = require('../src/models/user');

//Change the age from user.
//Then fetch all users have that age

//dont have to use $set with mongoose
//Promise Chaining
// User.findByIdAndUpdate('5ee12deaa6b87035337ebaa3', { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return [user, count];
};

updateAgeAndCount('5ee15029c539504099491166', 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
