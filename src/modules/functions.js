const addTask = (task, id) => {
  task = { description: task, completed: false, ID: id}
  return task;
}

module.exports = {
  addTask,
}