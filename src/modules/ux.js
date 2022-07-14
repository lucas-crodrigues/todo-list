const { markupAllTasks } = require('./functions.js');
const { addTask } = require('./functions.js');
const { removeTask } = require('./functions.js');
const { updateTask } = require('./functions.js');
const { updateIds } = require('./functions.js');
const { checkBox } = require('./functions.js');
const { clearComplete } = require('./functions.js');

const renderTasks = () => {
  const tasksContainer = document.querySelector('.todo-placeholder');
  updateIds();
  tasksContainer.innerHTML = markupAllTasks();
  const page = document.querySelector('body');
  page.replaceWith(page.cloneNode(true));
  addEventListeners(); // eslint-disable-line no-use-before-define
};

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

  const check = document.querySelectorAll('.checkbox');
  check.forEach((box) => {
    box.addEventListener('change', (e) => {
      checkBox(e);
      renderTasks();
    });
  });

  const clearCompleted = document.querySelector('.clear-complete');
  clearCompleted.addEventListener('click', () => {
    clearComplete();
    renderTasks();
  });

  const refresh = document.querySelector('.head button');
  refresh.addEventListener('dblclick', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      task.completed = true;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    clearComplete();
    renderTasks();
  });
};

module.exports = {
  renderTasks,
  addEventListeners,
};