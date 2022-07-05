import _ from 'lodash';
import './style.css';

const tasks = [
  { description: 'Wash the dishes', completed: true, index: 1},
  { description: 'complete To Do list project', completed: false, index: 2},
];

const markupAllTasks = () => {
  let list = '';
  tasks.forEach((task) => {
    list += 
  `<div class="id_${task.index}">
    <input type="checkbox"  class="checkbox" ${task.completed ? 'checked' : ''}>
    <p>${task.description}</p>
    <button type="button">🗑</button>
  </div>
  <hr>`;
  });
  return list;
}

const renderTasks = () => {
  const taskList = document.querySelector('.to-do-list');
  taskList.innerHTML = markupAllTasks();
}

window.addEventListener('DOMContentLoaded', () => renderTasks());