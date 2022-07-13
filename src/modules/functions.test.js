/**
 * @jest-environment jsdom
 */

const { addTask } = require('./functions.js');
const { removeTask } = require('./functions.js');
const { renderTasks } = require('./ux.js');

const html = `<section class="todo-list">
<div class="head">
    <h1>Today's To-Do List</h1>
    <button type="button">⟳</button>
</div>
<form action="submit">
    <div>
        <input class="add-task" type="text" placeholder="Add to your list..." required>
        <button type="submit">↵</button>
    </div>
</form>
<ul class="todo-placeholder"></ul>
<button type="button" class="clear-complete">Clear all completed</button>
</section>`;

document.body.innerHTML = html;

describe('Add and delete functions', () => {
  test('add 1 item', () => {
    addTask();
    renderTasks();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(1);
  });

  test('add 2 items or more', () => {
    addTask();
    renderTasks();
    addTask();
    renderTasks();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(3);
  });
});
