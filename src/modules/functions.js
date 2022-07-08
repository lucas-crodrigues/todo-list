let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const getLocalStorage = () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
}

const markupAllTasks = () => {
  let allTasks = '';
  getLocalStorage().forEach((task) => {
    allTasks += `<li class="task-list li_${task.id} ${task.completed ? 'checked-task' : ''}">
                            <input type="checkbox" class="checkbox"  id="c_${task.id}" ${task.completed ? 'checked' : ''}>
                            <input class="task-name"  id="i_${task.id}" type="text" value="${task.taskName}"></input>
                            <button type="button" class="remove" id="${task.id}">🗑</button>
                          </li>`;
  });
  return allTasks;
}

const addTask = () => {
  const itask = document.querySelector('.add-task').value;
  tasks = getLocalStorage();
  tasks.push({ taskName: itask, completed: false, id: tasks.length + 1 });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.querySelector('.add-task').value = '';
}

const removeTask = (e) => {
  tasks = getLocalStorage();
  const button = e.target;
  const buttonID = button.id;
  tasks.splice(buttonID - 1, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

const updateTask = (e) => {
  tasks = getLocalStorage();
  const task = e.target;
  const index = Number(task.id.split('_')[1]);
  tasks[index - 1].taskName = e.target.value;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

const updateIds = () => {
  tasks = getLocalStorage();
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

module.exports = {
  markupAllTasks,
  addTask,
  removeTask,
  updateTask,
  updateIds,
}