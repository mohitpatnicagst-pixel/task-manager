const API = "https://task-manager-backend-bh60.onrender.com";

let currentUser = null;

// DOM
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const app = document.getElementById("app");
const taskList = document.getElementById("taskList");

// ---------- UI SWITCH ----------
function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

// ---------- SIGNUP ----------
async function signup() {
  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message || "Account created");
  showLogin();
}

// ---------- LOGIN ----------
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
    currentUser = data.user;
    localStorage.setItem("user", JSON.stringify(currentUser));
    loginBox.style.display = "none";
    app.style.display = "block";
    loadTasks();
  } else {
    alert("Invalid credentials");
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// ---------- LOAD TASKS ----------
async function loadTasks() {
  taskList.innerHTML = "";

  const res = await fetch(`${API}/tasks/${currentUser.id}`);
  const tasks = await res.json();

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.completed ? "✅" : "⬜"} ${task.title}
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    taskList.appendChild(li);
  });
}

// ---------- ADD TASK ----------
async function addTask() {
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: currentUser.id,
      title
    })
  });

  taskInput.value = "";
  loadTasks();
}

// ---------- DELETE TASK ----------
async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

// ---------- AUTO LOGIN ----------
window.onload = () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    loginBox.style.display = "none";
    app.style.display = "block";
    loadTasks();
  }
};
