import { savetask, onGetTasks, deleteTask,getTask, updateTask } from "./firebase.js";




const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus=false;


let id;




window.addEventListener("DOMContentLoaded", async () => {
  //guardo los datos que existen en el momento de la consulta

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML='';

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
                 <div class="card mb-2 card-body border-primary" >
                 <h3 class=" ">${task.title}</h3>
                 <h5 class=" ">${task.description}</h5>

                  <div >
                  <button class="btn btn-danger btn-delete" data-id="${doc.id}" >Delete</button>
                  <button class="btn btn-success btn-edit"  data-id="${doc.id}" >Edit</button>
                  </div>
                 
                 </div>
     
             `;
    });

    

    const btnDeletes = tasksContainer.querySelectorAll(".btn-delete");

    btnDeletes.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        
        const doc = await getTask(e.target.dataset.id);
        const task= doc.data();
        taskForm['task-title'].value=task.title;
        taskForm['task-description'].value=task.description;


        editStatus=true;

        id=e.target.dataset.id;

        taskForm['btn-task-save'].innerText='Update';
      });
    });

   

  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];



  if(editStatus){
    updateTask(id, {title: title.value, description: description.value});
    editStatus=false;
    taskForm['btn-task-save'].innerText='Save';
  }else{
    
    savetask(title.value, description.value);
  }


  taskForm.reset();
});
