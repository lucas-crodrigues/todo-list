/**
 * @jest-environment jsdom
 */

const { addTask } = require('./functions.js');
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

describe('Add and remove functions', () => {
  test('add 1 item', () => {
    addTask();
    renderTasks();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(1);
  });

  test('add 2 more items', () => {
    addTask();
    renderTasks();
    addTask();
    renderTasks();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(3);
  });

  test('submit 1 more item', () => {
    renderTasks();
    document.querySelector('.add-task').value = 'a task';
    document.querySelector('form div button').click();
    const list = document.querySelectorAll('.task-list');
    expect(list).toHaveLength(4);
  });

  test('remove 1 item', () => {
    const tasks = [{ taskName: 'task 1', completed: false, id: 1 }, { taskName: 'task 2', completed: false, id: 2 }, { taskName: 'task 3', completed: false, id: 3 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.querySelector('#r_3').click();
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    const list = document.querySelectorAll('.task-list');
    expect(localStorageTasks).toHaveLength(2);
    expect(list).toHaveLength(2);
  });

  test('remove 2 items', () => {
    const tasks = [{ taskName: 'task 1', completed: false, id: 1 }, { taskName: 'task 2', completed: false, id: 2 }, { taskName: 'task 3', completed: false, id: 3 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.querySelector('#r_3').click();
    document.querySelector('#r_1').click();
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
    const list = document.querySelectorAll('.task-list');
    expect(localStorageTasks).toHaveLength(1);
    expect(list).toHaveLength(1);
  });
});

describe('Edit, update status, and Clear completed functions', () => {
  test('Edit description', () => {
    const tasks = [{ taskName: 'task 1', completed: false, id: 1 }, { taskName: 'task 2', completed: false, id: 2 }, { taskName: 'task 3', completed: false, id: 3 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.querySelector('#i_1').value = 'new task';
    document.querySelector('#i_1').dispatchEvent(new Event('input'));
    expect(JSON.parse(localStorage.getItem('tasks'))[0].taskName).toBe('new task');
  });

  test('Update status false to true', () => {
    document.querySelector('#c_1').click();
    expect(JSON.parse(localStorage.getItem('tasks'))[0].completed).toBe(true);
  });

  test('Update status true to false', () => {
    document.querySelector('#c_1').click();
    expect(JSON.parse(localStorage.getItem('tasks'))[0].completed).toBe(false);
  });

  test('Clear all completed', () => {
    const tasks = [{ taskName: 'task 1', completed: true, id: 1 }, { taskName: 'task 2', completed: true, id: 2 }, { taskName: 'task 3', completed: false, id: 3 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.querySelector('.clear-complete').click();
    const list = document.querySelectorAll('.task-list');
    expect(JSON.parse(localStorage.getItem('tasks'))).toHaveLength(1);
    expect(list).toHaveLength(1);
  });

  test('Clear all tasks', () => {
    const tasks = [{ taskName: 'task 1', completed: true, id: 1 }, { taskName: 'task 2', completed: true, id: 2 }, { taskName: 'task 3', completed: false, id: 3 }];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.querySelector('.head button').dispatchEvent(new Event('dblclick'));
    const list = document.querySelectorAll('.task-list');
    expect(JSON.parse(localStorage.getItem('tasks'))).toHaveLength(0);
    expect(list).toHaveLength(0);
  });
});
