var addingitem;
//selectors for adding todos
const todobutton=document.querySelector(".mybutton");
const todolist=document.querySelector(".todo-list");
const todoinput=document.querySelector(".myinput");


const filtertodo=document.getElementById("todosCheck");
//for numbering the div added
var number=1;
//event listeners
document.addEventListener("DOMContentLoaded",getTodos);

todobutton.addEventListener('click',(event)=>{
    event.preventDefault();

    addingitem=`<div id="div${number++}" class="todo-item shadowclass">
    <div class="deletecheck">
    <button onclick="checkFunction(this)" class="btn check px-1">
    <i class="fa fa-check"></i>
    </button>
    <button onclick="deleteFunction(this)" class="btn delete px-1">
    <i class="fa fa-times"></i>
    </button>
    </div>
    <div class="todohead text-left p-3 text-bold text-wrap">
    <p>${todoinput.value}</p>
    </div>
    </div>`;

    todolist.innerHTML+=addingitem;
    //save local storage
    saveLocalStorage(todoinput.value);
    //clear todovalue
    todoinput.value="";
});


//filter todo

filtertodo.addEventListener("click",(event)=>{
    let todos=Array.from(todolist.children);
    console.log(todos);
    todos.forEach((todo)=>{
        if(todo === undefined){

        }else{
            switch(event.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }else todo.style.display = "none";
                    break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }else todo.style.display = "none";
                    break;
            }
        }
    })
})


function checkFunction(el){
    const element=el.parentElement.parentElement;
    element.classList.toggle("completed");
}


function deleteFunction(el){
    const element=el.parentElement.parentElement;
    const elementId=`#${element.getAttribute("id")}`;
    deleteAnimation(elementId);
    element.addEventListener("transitionend",()=>{
        deleteTodosLocalStorage(element);
        element.remove();
    })
}

//save local storage
function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo)=>{
        addingitem=`<div id="div${number++}" class="todo-item shadowclass">
    <div class="deletecheck">
    <button onclick="checkFunction(this)" class="btn check px-1">
    <i class="fa fa-check"></i>
    </button>
    <button onclick="deleteFunction(this)" class="btn delete px-1">
    <i class="fa fa-times"></i>
    </button>
    </div>
    <div class="todohead text-left p-3 text-bold text-wrap">
    <p>${todo}</p>
    </div>
    </div>`;

    todolist.innerHTML+=addingitem;
    })
}

function deleteTodosLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[1].children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//animations
//animation on add button
const tl=gsap.timeline({paused : true});
//animations
tl.to("#icon",{
    duration: 0.3,
    rotation : 360,
    ease : "power4.out",
    color : "white"
})
tl.to(".addlabel",{
    duration : 0.3,
    delay : -0.3,
    backgroundColor: "grey",
    border : 0,
    ease : "power3.out"
})
//timelines

document.querySelector(".addlabel").addEventListener('mouseover',(event)=>{
    event.preventDefault();
    tl.play();
});

document.querySelector(".addlabel").addEventListener('mouseout',(event)=>{
    event.preventDefault();
    tl.reverse();
})

document.querySelector(".addlabel").addEventListener('click',(event)=>{
    event.preventDefault();
    tl.play();
})


//function delete animation

function deleteAnimation(elementId){
    const tl3=gsap.timeline();
    tl3.set(elementId,{transformOrigin : "100% 0%"})
    tl3.to(elementId, {
        duration: 0.5,
        rotation: -50,
        ease: "bounce"
    })
    .to(elementId, {
        duration: 0.5,
        delay : -0.5,
        opacity: 0
    })
}

//text banner animation

const texttl=gsap.timeline();
texttl.from(".textbanner",{
    duration : 0.5,
    y : -30,
    opacity : 0
}).to(".textbanner",{
    duration : 0.5,
    letterSpacing : "5px",
    ease : "back"
}).to(".textbanner",{
    duration : 0.3,
    letterSpacing : "0px",
    ease : "power2.out"
})