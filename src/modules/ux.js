const { addTask } = require('./functions.js');

const userAddTask = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const input = document.querySelector('.add-task');
  let iInput = input.value;
  const id = tasks.length + 1;
  tasks.push(addTask(iInput, id));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  input.value = '';
}

const addEventListeners = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    userAddTask();
  })
}

const markupAllTasks = () => {
  let list = '';
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    list
  += `<div class="id_${task.ID}">
    <input type="checkbox"  class="checkbox" ${task.completed ? 'checked' : ''}>
    <p>${task.description}</p>
    <button type="button">🗑</button>
  </div>
  <hr>`;
  });
  return list;
};

const renderTasks = () => {
  const taskList = document.querySelector('.to-do-list');
  taskList.innerHTML = markupAllTasks();
  addEventListeners();
};

module.exports = {
  addEventListeners,
  renderTasks,
}