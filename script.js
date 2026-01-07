const API = "https://task-manager-backend-bh60.onrender.com";

let currentUserId = null;

// DOM
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const app = document.getElementById("app");
const taskList = document.getElementById("taskList");

// ==================
// UI SWITCH
// ==================
function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

// ==================
// SIGNUP
// ==================
async function signup() {
  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message);
  showLogin();
}

// ==================
// LOGIN
// ==================
async function login() {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    currentUserId = data.userId;
    loginBox.style.display = "none";
    app.style.display = "block";
    loadTasks();
  } else {
    alert("Invalid credentials");
  }
}

// ==================
// ADD TASK (DB)
// ==================
async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: currentUserId,
      title
    })
  });

  taskInput.value = "";
  loadTasks();
}

// ==================
// LOAD TASKS (DB)
// ==================
async function loadTasks() {
  taskList.innerHTML = "";

  const res = await fetch(API + "/tasks/" + currentUserId);
  const tasks = await res.json();

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerText = task.title;
    taskList.appendChild(li);
  });
}

// ==================
// LOGOUT
// ==================
function logout() {
  currentUserId = null;
  app.style.display = "none";
  showLogin();
}
