const API = "https://task-manager-backend-bh60.onrender.com";
let userId = null;

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const app = document.getElementById("app");
const taskList = document.getElementById("taskList");

function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

async function signup() {
  await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: signupUsername.value,
      password: signupPassword.value
    })
  });
  alert("Account created");
  showLogin();
}

async function login() {
  const r = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: loginUsername.value,
      password: loginPassword.value
    })
  });

  const d = await r.json();
  if (!d.success) return alert("Invalid login");

  userId = d.userId;
  loginBox.style.display = "none";
  app.style.display = "block";
  loadDashboard();
}

async function loadDashboard() {
  const r = await fetch(API + "/tasks/" + userId);
  const tasks = await r.json();
  renderTasks(tasks);
  updateCards(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${t.completed ? "checked" : ""} 
        onclick="completeTask(${t.id})">
      ${t.title}
      <button onclick="deleteTask(${t.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

function updateCards(tasks) {
  const today = new Date();
  totalCount.innerText = tasks.length;
  completedCount.innerText = tasks.filter(t => t.completed).length;
  overdueCount.innerText = tasks.filter(t =>
    !t.completed && new Date(t.due_date) < today).length;
  upcomingCount.innerText = tasks.filter(t =>
    new Date(t.due_date) >= today).length;
}

async function addTask() {
  await fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      title: taskInput.value,
      dueDate: dueDate.value
    })
  });
  taskInput.value = "";
  loadDashboard();
}

async function completeTask(id) {
  await fetch(API + "/tasks/" + id + "/complete", { method: "PUT" });
  loadDashboard();
}

async function deleteTask(id) {
  await fetch(API + "/tasks/" + id, { method: "DELETE" });
  loadDashboard();
}

function logout() {
  location.reload();
}
