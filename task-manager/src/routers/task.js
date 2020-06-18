express = require('express');
router = express.Router();
Task = require('../models/task');
const auth = require('../middleware/auth');

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
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//read one
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send(`Cannot find task with id ${_id}`);
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update
router.patch('/tasks/:id', async (req, res) => {
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
    const task = await Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));
    task.save();

    if (!task) {
      return res.status(400).send(`Could not find task with id ${_id}`);
    }
    res.status(200).send(task);
  } catch (error) {
    res
      .status(400)
      .send(`Unable to update task with id ${_id}:  ${error.message}`);
  }
});

//delete
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send(`Cannot find task with id ${req.params.id}`);
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
