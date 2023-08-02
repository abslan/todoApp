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
/**
 * The function "setAttributes" sets the attributes of an element in JavaScript.
 * @param el - The `el` parameter is a reference to the HTML element that you want to set attributes
 * on.
 * @param attrs - The `attrs` parameter is an object that contains key-value pairs representing the
 * attributes and their values that you want to set on the element `el`.
 */
function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

//A. initialization
//Adding event listners for delete button of existing tasks
/* This code is selecting all elements with the class "btn-delete" and adding a click event listener to
each of them. When a button with the class "btn-delete" is clicked, the `deleteTask` function is
called with the event object as an argument. */
var deleteButtons = document.querySelectorAll('.btn-delete');
for(let btn of deleteButtons){
    btn.addEventListener("click", (event) => {
        deleteTask(event);
    })
}


/**
 * The code adds event listeners to a group of checkboxes and calls a function to handle toggling the
 * checkboxes and updating a counter.
 * @param box - The `box` parameter represents the checkbox element that triggered the change event.
 */
var checkBoxes = document.querySelectorAll('.checkbox-round');
function handleCheckBoxToggle(box){
    box.checked ? setTasksLeft(--tasksLeft) : setTasksLeft(++tasksLeft);
}

for(let box of checkBoxes){
    box.addEventListener("change", () => handleCheckBoxToggle(box));
}

//setting uncompleted tasks count
/**
 * The function `getTasksLeft` returns the number of unchecked checkboxes in a todo list.
 * @returns The number of unchecked tasks.
 */
function getTasksLeft(){ 
    let tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    // console.log(typeof tasksCheckboxes, tasksCheckboxes);
    return [...tasksCheckboxes].filter((item) => !item.checked).length;

}

/**
 * The code defines a variable "tasksLeft" and a function "setTasksLeft" that updates the value of
 * "tasksLeftNode" with the number of tasks left.
 * @param [num] - The `num` parameter is used to specify the number of tasks left. If no value is
 * provided for `num`, it will default to the value returned by the `getTasksLeft()` function.
 */
var tasksLeft = getTasksLeft();
function setTasksLeft(num= getTasksLeft()){
    tasksLeftNode.innerText = num;
}

/* The code is setting the initial value for the number of tasks left to complete. It calls the
`getTasksLeft()` function to calculate the number of uncompleted tasks and then sets the value of
the `tasksLeftNode` element to display this number. */
setTasksLeft();

//highlighting all
var textCustomStyle = "color: black ; font-weight : bold "
btnFilterAll.style = textCustomStyle;


//B. EventListeners
//form submission
formTodo.addEventListener('submit', (e) => addTask(e), false);


//Adding task to list
/**
 * The `addTask` function creates a new task item in a to-do list and appends it to the list container.
 * @param event - The `event` parameter is an object that represents the event that triggered the
 * function. It is typically passed in when the function is called as an event handler for a specific
 * event, such as a button click or form submission. The event object contains information about the
 * event, such as the target element,
 * @returns `false`.
 */
function addTask(event){
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

/**
 * The function "deleteTask" is used to remove a task from the DOM when a corresponding delete button
 * is clicked.
 * @param event - The event parameter is an object that represents the event that triggered the
 * function. It contains information about the event, such as the target element that triggered the
 * event.
 * @returns If the element's tag name is not "BUTTON", then nothing is being returned.
 */
function deleteTask(event){
    var element = event.target;
    var c=0;
    while(element.tagName!=="BUTTON" && c<6){
        element = element.parentElement;
        c+=1;
    }
    if(element.tagName!=="BUTTON"){
        return
    }
    element.parentElement.querySelector("input").checked ?
    setTasksLeft(tasksLeft): setTasksLeft(--tasksLeft);
    element.parentElement.parentElement.remove();
}

//Form Buttons functionality and event listeners
/**
 * The clearCompleted function removes all completed tasks from the todo list.
 */
function clearCompleted(){
    var tasksCheckboxes = document.querySelectorAll(".todo-item-container .checkbox-round");
    for(let input of tasksCheckboxes){
        if (input.checked){
            input.parentElement.parentElement.remove();
        }
    }
}

btnClearCompleted.onclick = clearCompleted;

/**
 * The `completeAll` function selects all checkboxes in a todo list and checks them if they are not
 * already checked.
 */
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
/**
 * The `handleFilter` function filters tasks based on the selected option and updates the visibility of
 * the corresponding checkboxes.
 * @param [option=all] - The `option` parameter is a string that represents the filter option selected
 * by the user. It can have three possible values: "all", "completed", or "uncompleted".
 * @returns The function does not have a return statement, so it will return undefined.
 */
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









