const { markupAllTasks } = require('./functions.js');
const { addTask } = require('./functions.js');
const { removeTask } = require('./functions.js');
const { updateTask } = require('./functions.js');
const { updateIds } = require('./functions.js');

const renderTasks = () => {
  const tasksContainer = document.querySelector('.todo-placeholder');
  updateIds();
  tasksContainer.innerHTML = markupAllTasks();
  const page = document.querySelector('body');
  page.replaceWith(page.cloneNode(true));
  addEventListeners();
}

const addEventListeners = () => {
  const addTaskForm = document.querySelector('form');
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
    renderTasks();
  });

  const removeTaskBtn = document.querySelectorAll('.remove');
  removeTaskBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      removeTask(e);
      renderTasks();
    });
  });

  const updateTaskInp = Array.from(document.querySelectorAll('.task-list .task-name'));
  updateTaskInp.forEach((input) => {
    input.addEventListener('input', (e) => {
      updateTask(e);
    });
  });
}

module.exports = { 
  renderTasks,
  addEventListeners
}