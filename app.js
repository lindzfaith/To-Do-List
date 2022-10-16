const filterOption = document.querySelector(".filter-tasks");
const toDoButton = document.querySelector(".to-do-button");
const toDoList = document.querySelector(".to-do-list");
const toDoInput = document.querySelector(".to-do-input");

toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTasks);

function addToDo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("task");

    const newList = document.createElement("li");
    newList.innerText = toDoInput.value;
    newList.classList.add("to-do-item");
    toDoDiv.appendChild(newList);

    saveTasks(toDoInput.value);

    const doneButton = document.createElement("button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("done-button");
    toDoDiv.appendChild(doneButton);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add("remove-button");
    toDoDiv.appendChild(removeButton);

    toDoList.appendChild(toDoDiv);
    toDoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === "remove-button") {
        const task = item.parentElement;
        task.classList.add("removed");
        task.addEventListener("transitionend", function() {
            task.remove();
        });
    }

    if (item.classList[0] === "done-button") {
        const task = item.parentElement;
        task.classList.toggle("completed");
    }
}

function filterTasks(event) {
    const tasks = toDoList.childNodes;
    tasks.forEach(function (task) { 
        if(task.style != undefined && task.style != null){
            switch (event.target.value) {
                case "all":
                    task.style.display = "flex";
                    break;
                case "completed":
                    if (task.classList.contains("completed")) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = "none";
                    }
                    break;
                case "to-dos":
                    if (task.classList.contains("completed")){
                        task.style.display = "none";
                    }
                    else{
                        task.style.display = "flex";
                    }
                    break;
            }
        }
    });
}

function saveTasks(task){
    let tasks;
    if(localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}