let todoList=[ ]          

function addTodoItem(task){
      const todoItem={
         task,           
         done:false,
         id:Date.now()
        };
     todoList.push (todoItem); 
     refreshTodoList(todoItem);
     
     savelocaSstorage();
    }    
    
    function refreshTodoList(todoItem){
        const ul= document.querySelector("#todo-list");
        const oldItem=document.querySelector(`[data-id="${todoItem.id}"]`);
        
        if(todoItem.deleted){
               oldItem.remove();
               return;
         }

        const li= document.createElement("li");
        const isDone = todoItem.done ? "done": "" ;
        li.setAttribute("data-id",todoItem.id);
        li.setAttribute("class",`todo-item ${isDone}`);
        li.innerHTML=`<label for ="${todoItem.id}" class="tick"></label>
        <input type="checkbox" id="${todoItem.id}" >
        <span>${todoItem.task}</span>
        <button class="delete"><img src="images/remove.png" alt=""></button>`;
        
        if(oldItem){
           ul.replaceChild(li,oldItem);
        }else{
            ul.insertBefore(li,ul.firstElementChild);  
         }
      }     
      
      function toggleDone(id){
            const index= todoList.findIndex(todoItem=>todoItem.id===Number(id));       
             
            todoList[index].done=!todoList[index].done;
             refreshTodoList(todoList[index]);  
             savelocaSstorage();
      }

      function deleteTodoItem(id){
            const index=todoList.findIndex(todoItem=>todoItem.id===Number(id))  
             todoList[index].deleted=true;
             refreshTodoList(todoList[index]);
             todoList=todoList.filter(todoItem=>todoItem.id !==Number(id));
             
             savelocaSstorage();
      }; 

      function savelocaSstorage(){
            localStorage.setItem("todo-list",
            JSON.stringify(todoList)); 
      };
       
const form=document.querySelector("#todo-form");

form.addEventListener("submit",event=>{
     event.preventDefault();
     const input=document.querySelector
     ("#todo-input");
     const task = input.value.trim();
    
     
      if(task !==""){
            addTodoItem(task);
            input.value =""    
       }else{
            alert("Please enter an item")
      }
     
});
     
const ul=document.querySelector("#todo-list");
    
 ul.addEventListener("click",event=> {
      
      const id=event.target.parentElement.dataset.id;
      if(event.target.classList.contains("tick")){
      toggleDone(id);
       }else if(event.target.classList.contains("delete")) {
        console.log(`Delete id ${id}`)
        deleteTodoItem(id);  
        console.log(todoList);
       }
 });

  document.addEventListener("DOMContentLoaded",
  ()=>{
        const todoListString= localStorage.getItem
        ("todo-list");

        if (todoListString){
            todoList=JSON.parse(todoListString);
            for(let i=0; i<todoList.length;i++){
                  refreshTodoList(todoList[i]);
            }
        }
  });

