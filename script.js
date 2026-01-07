let total = 0;
let completed = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.innerText = text;

  li.onclick = function () {
    if (!this.classList.contains("done")) {
      this.classList.add("done");
      this.style.textDecoration = "line-through";
      completed++;
      document.getElementById("completedTasks").innerText = completed;
    }
  };

  document.getElementById("taskList").appendChild(li);
  input.value = "";

  total++;
  document.getElementById("totalTasks").innerText = total;
}
