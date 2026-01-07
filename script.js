// LOGIN FUNCTION (Demo)
function login() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// SHOW SIGNUP FORM
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("app").style.display = "none";
}

// BACK TO LOGIN FROM SIGNUP
function backToLogin() {
  alert("Signup successful (demo only)");
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("app").style.display = "none";
}

// ADD TASK FUNCTION
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerText = taskText;

  // click to mark complete
  li.onclick = function () {
    this.style.textDecoration = "line-through";
    this.style.opacity = "0.6";
  };

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}
