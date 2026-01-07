function login() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerText = taskText;
  document.getElementById("taskList").appendChild(li);

  taskInput.value = "";
}
