const input = document.getElementById("inputdata");
const todoInput = document.getElementById("todoinput");
const todoListEx = document.getElementById("todoList");
//const notificationEx = document.querySelector('.notification');
//const notificationEx = document.getElementById("notify");

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

renderTodos();

input.addEventListener('submit', function(event) {
     event.preventDefault();

     saveList();
     renderTodos();
     localStorage.setItem('todos',JSON.stringify(todos));
});

function saveList()
{
      const todoValue = todoInput.value;

      const isEmpty = todoValue === "";

      const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase() );

      if(isEmpty)
      {
        alert_1("Empty input field");
      }
      else if(isDuplicate)
      {
        alert_1("Todo already exists !");
      }
      else 
      {
        if(EditTodoId >= 0)
        {
             todos = todos.map((todo , index ) => ({
                  ...todo,
                  value : index === EditTodoId ? todoValue: todo.value,
               }));

              EditTodoId = -1; 
        }
        else{
          const todo = 
      
            todos.push({
              value : todoValue, 
              checked : false,
              color :  '#' + Math.floor(Math.random()*16777215).toString(16)
            });
            todoInput.value="";
            console.log(todos);
        }
      }
      
}

function renderTodos()
{
  if( todos.length === 0)
  {
    todoListEx.innerHTML = '<center style="margin-right :236px" >Nothing to do ! </center>';
    return;
  }

  todoListEx.innerHTML ='';

    todos.forEach((todo, index) => {

        todoListEx.innerHTML += `
       
        <div class="todo" id=${index}>
        <div class="top" id=${index}>
       <i class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
         style="color : ${todo.color}"  id=${index}
         data-action="check"
       ></i> 
       <p class="${todo.checked ? 'checked' : ''}" id=${index} data-action="check">${todo.value}</p>
     </div >
       <div class="bottom" id=${index}>
       <i class="bi bi-pencil-fill" id=${index} data-action="edit"></i>
       <i class="bi bi-archive-fill" id=${index} data-action="delete"></i>
     </div>
    
        `;
    });
}

todoListEx.addEventListener('click' , (event) =>{
  const target = event.target;
  const parentElement = target.parentNode.parentNode;

if(parentElement.className !== 'todo') return;


const todo = parentElement;
const todoId = Number(todo.id);

const action= target.dataset.action;

action === "check" && checkTodo(todoId);
action === "edit" && editTodo(todoId);
action === "delete" && deleteTodo(todoId);


  console.log(todoId, action);
})


function checkTodo(todoId){
   
   todos = todos.map((todo , index) => ({
            ...todo,
            checked : index == todoId ? !todo.checked : todo.checked
         }));

         renderTodos();
         localStorage.setItem('todos',JSON.stringify(todos));

}

function editTodo(todoId){
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

function deleteTodo(todoId){
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  renderTodos();
  localStorage.setItem('todos',JSON.stringify(todos));

}


/*function showNotifications(msg){

  // notificationEx.innerHTML = `
   
  // <div class="notification">${msg}</div>

  // `;
    notificationEx.innerHTML = msg;

   //notificationEx.classList.add('notif-enter');

   console.log(msg);

   //setTimeout(() => {
   //   notificationEx.classList.remove('notif-enter');
  // }, 10000);

}       */

function alert_1(msg){
  if(msg === "Empty input field")
  swal(msg,"Need text to add !");
 else
 {
  swal(msg,"No need to add two exact same todo's");
 }
}