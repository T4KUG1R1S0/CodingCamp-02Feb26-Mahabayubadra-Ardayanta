const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");

let tasks = [];
let currentFilter = "all";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (taskInput.value === "" || dateInput.value === "") {
    alert("Please fill all fields!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskInput.value,
    date: dateInput.value,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
});

function renderTasks() {
  todoList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">
        ${task.text} (${task.date})
      </span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    todoList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}
