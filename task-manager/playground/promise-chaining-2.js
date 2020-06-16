require('../src/db/connect');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5ee13b32161d5b36c13b248e')
//   .then((deleted) => {
//     console.log('deleted', deleted);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log('count', count);
//   })
//   .catch((err) => {
//     console.log('err', err);
//   });

async function deleteTaskAndCount(id) {
  const deleted = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  const tasks = await Task.find({ completed: false });
  return { deleted, count, tasks };
}

deleteTaskAndCount('5ee11e364b7ebe30cb10d040')
  .then((incomplete) => {
    console.log('deleted', incomplete.deleted);
    console.log(`There are ${incomplete.count} task(s) that are not complete`);
    console.log(incomplete.tasks);
  })
  .catch((err) => console.log(err));
