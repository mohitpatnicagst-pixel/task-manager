const API_URL = "https://task-manager-backend-bh60.onrender.com";
let token = localStorage.getItem("token") || "";

// ---------- AUTH ----------
async function signup() {
  const username = document.getElementById("su_username").value;
  const password = document.getElementById("su_password").value;

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.message || "Signup done");
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    token = data.token;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadTasks();
  } else {
    alert("Login failed");
  }
}

// ---------- TASKS ----------
async function addTask() {
  const title = document.getElementById("taskInput").value;
  if (!title) return;

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title })
  });

  document.getElementById("taskInput").value = "";
  loadTasks();
}

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const tasks = await res.json();
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerText = t.title;
    ul.appendChild(li);
  });
}
