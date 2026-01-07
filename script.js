const API = "https://task-manager-backend-bh60.onrender.com";

/* =====================
   DOM ELEMENTS
===================== */
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const app = document.getElementById("app");
const taskList = document.getElementById("taskList");

/* =====================
   INITIAL STATE
===================== */
loginBox.style.display = "block";
signupBox.style.display = "none";
app.style.display = "none";

/* =====================
   SCREEN SWITCH
===================== */
function showSignup() {
  loginBox.style.display = "none";
  signupBox.style.display = "block";
  app.style.display = "none";
}

function showLogin() {
  signupBox.style.display = "none";
  loginBox.style.display = "block";
  app.style.display = "none";
}

/* =====================
   SIGNUP
===================== */
async function signup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !password) {
    alert("Username & password required");
    return;
  }

  try {
    const res = await fetch(API + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully. Please login.");
      showLogin();
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    alert("Server error");
  }
}

/* =====================
   LOGIN
===================== */
async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Username & password required");
    return;
  }

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success === true) {
      loginBox.style.display = "none";
      signupBox.style.display = "none";
      app.style.display = "block";
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    alert("Server error");
  }
}

/* =====================
   LOGOUT
===================== */
function logout() {
  app.style.display = "none";
  loginBox.style.display = "block";
}

/* =====================
   TASK (FRONTEND ONLY)
===================== */
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (!text) return;

  const li = document.createElement("li");
  li.innerText = text;
  taskList.appendChild(li);

  taskInput.value = "";
}
