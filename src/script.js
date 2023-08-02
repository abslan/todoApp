//TODO todo change theme , add total tasks, edit task, and empty input value
//TODO todo local storage to save todos


//form buttons
let btnClearCompleted = document.getElementById("clear-completed");
let btnCompleteAll = document.getElementById("complete-all");

//filter buttons
let btnFilterAll = document.getElementById("all");
let btnFilterUncompleted = document.getElementById("uncompleted");
let btnFilterCompleted = document.getElementById("completed");

//todo list
let todoList = document.getElementById("todo-list");

//input
let inputTodo = document.getElementById("todo-input");
let formTodo = document.getElementById('todo-form');

//tasksleft node
let tasksLeftNode = document.querySelector("#tasks-left b");

//util function
function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

//A. initialization
//Adding event listners for delete button of existing tasks
var deleteButtons = document.querySelectorAll('.btn-delete');
for(let btn of deleteButtons){
    btn.addEventListener("click", (event) => {
        deleteTask(event);
    })
}
//checkbox eventlistner
var checkBoxes = document.querySelectorAll('.checkbox-round');
function handleCheckBoxToggle(box){
    box.checked ? setTasksLeft(--tasksLeft) : setTasksLeft(++tasksLeft);
}

for(let box of checkBoxes){
    box.addEventListener("change", () => handleCheckBoxToggle(box));
}

//setting uncompleted tasks count
function getTasksLeft(){ 
    let tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    // console.log(typeof tasksCheckboxes, tasksCheckboxes);
    return [...tasksCheckboxes].filter((item) => !item.checked).length;

}

var tasksLeft = getTasksLeft();
function setTasksLeft(num= getTasksLeft()){
    tasksLeftNode.innerText = num;
}

// setting tasks left for initial render
setTasksLeft();

//highlighting all
var textCustomStyle = "color: black ; font-weight : bold "
btnFilterAll.style = textCustomStyle;


//B. EventListeners
//form submission
formTodo.addEventListener('submit', (e) => addTask(e), false);


//Adding task to list
function addTask(event, va){
    event.preventDefault();
    // console.log("event", event, va)
    let text = inputTodo.value;

    //li
    let li = document.createElement("li");
    //task item container
    let itemContainer = document.createElement("div");
    itemContainer.className = "todo-item-container";
    //checkbox
    let inputCheckbox = document.createElement("input");
    setAttributes(inputCheckbox, {type:"checkbox", class: "checkbox-round"});
    //text
    let textTodo = document.createElement("p");
    textTodo.innerText = text;
    //delete btn
    let btnDelete = document.createElement("button");
    btnDelete.className = "btn-delete";
    //delete icon
    // let svgDelete  = document.createElement("svg");
    let svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    setAttributes(svgDelete,{xmlns:"http://www.w3.org/2000/svg",height:"1em" , viewBox : "0 0 512 512"});
    let svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", "M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z");
    //build delte btn
    svgDelete.appendChild(svgPath);
    btnDelete.appendChild(svgDelete);

    //btn event listner
    btnDelete.addEventListener("click", (event) => {
        deleteTask(event);
    })
    //checkbox event listner
    inputCheckbox.addEventListener("change", () => handleCheckBoxToggle(inputCheckbox));

    //build itemcontainer
    itemContainer.append(inputCheckbox, textTodo, btnDelete);
    //build li
    li.append(itemContainer);

    document.getElementById("todo-list").append(li);
    // console.log(li)
    inputTodo.value = '';
    setTasksLeft(++tasksLeft);
    return false;

}

function deleteTask(event){
    // console.log(event.target, event.target.tagName, event.target.parentElement.parentElement.querySelector("input"));
    var element = event.target;
    var c=0;
    while(element.tagName!=="BUTTON" && c<6){
        element = element.parentElement;
        // console.log(element.tagName, element)
        c+=1;
    }
    if(element.tagName!=="BUTTON"){
        return
    }
    element.parentElement.querySelector("input").checked ?
    setTasksLeft(tasksLeft): setTasksLeft(--tasksLeft);
    element.parentElement.parentElement.remove();
}

//Form Buttons
function clearCompleted(){
    var tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    for(let input of tasksCheckboxes){
        if (input.checked){
            input.parentElement.parentElement.remove();
        }
    }
}

btnClearCompleted.onclick = clearCompleted;

function completeAll(){
    var tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    for(let input of tasksCheckboxes){
        if (!input.checked){
            input.checked = true;
        }
    }
}

btnCompleteAll.onclick = completeAll;


//Filter Buttons
let filterButtons = [btnFilterAll, btnFilterCompleted, btnFilterUncompleted];
let filterOptions = ["all", "completed", "uncompleted"];
function handleFilter(option = "all"){
    // console.log("handleFilter", option)
    var index = filterOptions.indexOf(option);
    if(index===-1){
        return
    }
    var tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    for(let input of tasksCheckboxes){
        if(option==="all"){
            // input.parentElement.parentElement.style.visibility = "visible";
            input.parentElement.parentElement.style.display = "inline-block";
        }else if(option=="completed"){
            // input.parentElement.parentElement.style.visibility = !input.checked ? "hidden" : "visible";
            input.parentElement.parentElement.style.display = !input.checked ? "none" : "inline-block";
        }else if(option=="uncompleted"){
            // input.parentElement.parentElement.style.visibility = input.checked ? "hidden" : "visible";
            input.parentElement.parentElement.style.display = input.checked ? "none" : "inline-block";
        }
    }
    for(let i=0; i<filterButtons.length ; i++){
        if(i===index){
            filterButtons[i].style = textCustomStyle;
        }else{
            filterButtons[i].style = undefined;
        }
    }

}

btnFilterAll.addEventListener("click", () =>  handleFilter(filterOptions[0]));

btnFilterCompleted.addEventListener("click", () =>  handleFilter(filterOptions[1]));

btnFilterUncompleted.addEventListener("click", () => handleFilter(filterOptions[2]));









