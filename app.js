const todoInput = document.querySelector("#todoInput");
 
const todoList = document.querySelector("#todoList")
const completed_btn = document.querySelector("#completed-btn")
const all_btn = document.querySelector("#all-btn")
const active_btn = document.querySelector("#active-btn")
 
const clearCompletedBtn = document.querySelector("#clearCompletedBtn")
let items_left = document.querySelector(".items-left")
const addTodoBtn = document.querySelector("#addTodoBtn")

 let arr = JSON.parse(localStorage.getItem("todos")) || [];


//create the task
 function func_element(obj){
        //list
    let li = document.createElement("li")
    li.classList.add("todo-item");
    if(obj.isCompleted) {
        li.classList.add("completed")
    }
    
    todoList.append(li)

    //input
    let input = document.createElement("input")
    input.setAttribute("type", "checkbox")
    input.classList.add("todo-checkbox")
    input.checked = obj.isChecked;
    li.append(input)
    

    //span
    let span = document.createElement("span")
    span.classList.add("todo-text")
    span.innerText = obj.value;
    li.append(span)

    //button
    let button = document.createElement("button")
    button.classList.add("delete-btn")
    button.innerText = "×";
    li.append(button);


    //event listener on input
    input.addEventListener('click',()=>{
        li.classList.toggle("completed");
        if(li.classList.contains("completed")){

            obj.isCompleted = true;
            obj.isChecked = true;
            
        }else{
            obj.isCompleted =false;
            obj.isChecked = false;

        }
        localStorage.setItem("todos" , JSON.stringify(arr))
        items_left.innerText =`${arr.length} items left`;
         
    })

    //event listener on delete button
    button.addEventListener("click" , ()=>{
        //removing the obj from the arr;
        arr = arr.filter(arr_obj => arr_obj !== obj);
        todoList.removeChild(li);
         console.log(arr)
         //update the local storage
         localStorage.setItem("todos", JSON.stringify(arr))
         items_left.innerText =`${arr.length} items left`;

    })


    //event listener on clear completed
    clearCompletedBtn.addEventListener('click',()=>{

        arr = arr.filter(arr_obj => arr_obj.isCompleted == false)
        localStorage.setItem('todos' , JSON.stringify(arr))
        document.querySelectorAll(".completed").forEach((o)=>{
            todoList.removeChild(o);
               
        });

         items_left.innerText =`${arr.length} items left`;
    })






    items_left.innerText =`${arr.length} items left`;


//complete-btn section
completed_btn.addEventListener("click",()=>{
    active_btn.classList.remove("active")
    all_btn.classList.remove("active")
    completed_btn.classList.add("active")
    let count =0;
    document.querySelectorAll('.todo-item').forEach((o)=>{
        
        if(!(o.classList.contains("completed"))){
            o.classList.add("hidden")
        }else{
            count++;
            o.classList.remove("hidden")
        }
    })
    items_left.innerText =`${count} items left`;
    
})
//active-btn-section
active_btn.addEventListener("click",()=>{
    completed_btn.classList.remove("active")
    all_btn.classList.remove("active")
    active_btn.classList.add("active")
    let count =0;
    document.querySelectorAll('.todo-item').forEach((o)=>{
        if((o.classList.contains("completed"))){
            o.classList.add("hidden")
        }else{
            o.classList.remove("hidden")
              count++;
        }
    })
     items_left.innerText =`${count} items left`;
    
})

//all-btn-section
all_btn.addEventListener("click",()=>{
    completed_btn.classList.remove("active")
    active_btn.classList.remove("active")
    all_btn.classList.add("active")
    let count =0;
    document.querySelectorAll('.todo-item').forEach((o)=>{
         
            o.classList.remove("hidden")
              count++;

       
    })
     items_left.innerText =`${count} items left`;

    
})

 


 }

    

addTodoBtn.addEventListener('click',(k)=>{
    k.preventDefault();
    let val = todoInput.value;
    if(val){
        todo_obj = {
            "value" :val,
            "isCompleted" : false,
            "isChecked" :false
        }

        arr.push(todo_obj);
        func_element(todo_obj); // live show on page
        localStorage.setItem("todos" ,  JSON.stringify(arr));  // save in local storage
        todoInput.value = ""
    }



 })

 
 //fetch from local storage

arr.forEach((obj)=>{
    func_element(obj);
})


