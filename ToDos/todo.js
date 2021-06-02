var addingitem;
//selectors for adding todos
const todobutton=document.querySelector(".mybutton");
const todolist=document.querySelector(".todo-list");
const todoinput=document.querySelector(".myinput");
//for numbering the div added
var number=1;
//event listeners

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
    todoinput.value="";
});

// todobutton.addEventListener('click',(event)=>{
//     // prevent form from submiting
//     event.preventDefault();
//     //create functionality
//     const tododiv=document.createElement("div");
//     tododiv.setAttribute("id",`div${number++}`);
//     tododiv.classList.add("todo-item","shadowclass");
//     //delete check node
//     const tododeletecheck=document.createElement("div");
//     tododeletecheck.classList.add("deletecheck");
//     //check node
//     const todoc=document.createElement("button");
//     todoc.innerHTML=`<i class="fa fa-check"></i>`;
//     todoc.classList.add("btn","check","px-1");
//     //append
//     tododeletecheck.appendChild(todoc);
//     //delete node
//     const todod=document.createElement("button");
//     todod.innerHTML=`<i class="fa fa-times"></i>`;
//     todod.classList.add("btn","delete","px-1");
//     //append child
//     tododeletecheck.appendChild(todod);
//     //add delete check node to main
//     tododiv.appendChild(tododeletecheck);
//     //head tag
//     const todohead=document.createElement("div");
//     todohead.classList.add("todohead","text-left","p-3","text-bold");
//     //p tag
//     todohead.innerHTML=`<p>${todoinput.value}</p>`;
//     tododiv.appendChild(todohead);

//     //add head tag
//     tododiv.appendChild(todohead);
//     //append to list
//     todolist.appendChild(tododiv);

//     todoinput.value="";
// });

//functions
    
function checkFunction(el){
    const element=el.parentElement.parentElement;
    element.classList.toggle("completed");
}


function deleteFunction(el){
    const tl3=gsap.timeline();
    const element=el.parentElement.parentElement;
    const elementid=`#${element.getAttribute("id")}`;
    tl3.set(elementid,{transformOrigin : "100% 0%"})
    tl3.to(elementid, {
        duration: 0.5,
        rotation: -50,
        ease: "bounce"
    })
    .to(elementid, {
        duration: 0.4,
        delay : -0.4,
        y: 10,
        x : -50,
        opacity: 0
    })
    var timeout=setTimeout(()=>{
        element.remove();
    },600);
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
