const API = "https://task-manager-backend-bh60.onrender.com";
let userId = null;

function showSignup(){loginBox.style.display="none";signupBox.style.display="block"}
function showLogin(){signupBox.style.display="none";loginBox.style.display="block"}
function logout(){location.reload()}

async function signup(){
  await fetch(API+"/signup",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({username:signupUsername.value,password:signupPassword.value})});
  alert("Account created");
  showLogin();
}

async function login(){
  const res=await fetch(API+"/login",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({username:loginUsername.value,password:loginPassword.value})});
  const data=await res.json();
  if(!data.success)return alert("Invalid");
  userId=data.userId;
  loginBox.style.display="none";
  app.style.display="block";
  loadTasks();
}

async function loadTasks(){
  const res=await fetch(API+"/tasks/"+userId);
  const tasks=await res.json();
  taskList.innerHTML="";
  let c=0;
  tasks.forEach(t=>{
    if(t.completed)c++;
    taskList.innerHTML+=`
      <div class="task">
        <input type="checkbox" ${t.completed?"checked":""} onclick="toggle(${t.id})">
        ${t.title}
        <button onclick="del(${t.id})">❌</button>
      </div>`;
  });
  total.innerText=tasks.length;
  completed.innerText=c;
}

async function addTask(){
  await fetch(API+"/tasks",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({userId,title:taskInput.value,dueDate:dueDate.value})});
  taskInput.value="";
  loadTasks();
}

async function toggle(id){await fetch(API+"/tasks/"+id,{method:"PUT"});loadTasks()}
async function del(id){await fetch(API+"/tasks/"+id,{method:"DELETE"});loadTasks()}
