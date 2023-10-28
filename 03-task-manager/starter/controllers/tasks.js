const Task = require("../models/Task");
const getAllTasks = (req, res) => {
  res.send("all items");
};

// const createTask = async (req, res) => {
//   console.log(req.body);
//   const task = await Task.create(req.body);
//   res.status(201).json({ task });
// };

const createTask = async (req, res) => {
  console.log(req.body);
  const task = await Task.create(req.body);
  console.log(task);
  res.status(201).json({ task });
};

const getTask = (req, res) => {
  res.send("get single task " + paramas.id);
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

// router.route("/").get((req, res) => {
//   res.send("all items");
// });

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
