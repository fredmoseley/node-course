express = require('express');
router = express.Router();
Task = require('../models/task');
const auth = require('../middleware/auth');
const e = require('express');

//create
router.post('/tasks', auth, async (req, res) => {
  //add owner to task
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//read
//GET /tasks?completed=false
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'; //req.query.completed is a string!!
  }
  try {
    //method 1
    //const tasks = await Task.find({ owner: req.user._id });
    //res.send(tasks);

    //method 2 using virtual attribute
    await req.user
      .populate({
        path: 'tasks',
        match
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//read one
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      // return res.status(404).send(`Cannot find task with id ${_id}`);
      //better to not send details.  harder to hack??
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update
router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ['description', 'completed']; //valid fields
  const invalidFields = []; //list of invalid fields tried to update
  const updates = Object.keys(req.body);
  //Updating valid field?
  const isValidOperation = updates.every((update) => {
    const exists = allowedUpdates.includes(update);
    if (!exists) {
      invalidFields.push(update);
    }
    return exists;
  });

  if (!isValidOperation) {
    res
      .status(400)
      .send(
        `Your tried to update a field that does not exist: ${invalidFields.join(
          ','
        )}`
      );
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send(`Could not find task.`);
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send(`Cannot find task.`);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
