const API = "https://task-manager-backend-bh60.onrender.com";

// DOM
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const app = document.getElementById("app");

// SWITCH
function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
}

// SIGNUP
async function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !password) {
    alert("Username & password required");
    return;
  }

  const res = await fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message || "Account created");
  showLogin();
}

// LOGIN
async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Username & password required");
    return;
  }

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success === true) {
    loginBox.style.display = "none";
    app.style.display = "block";
  } else {
    alert("Invalid credentials");
  }
}

// TASK (frontend only)
function addTask() {
  const taskInput = document.getElementById("taskInput");
  if (!taskInput.value) return;

  const li = document.createElement("li");
  li.innerText = taskInput.value;
  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedIn");
  location.reload();
}
