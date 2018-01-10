var taskInput = document.getElementById("Add_Item");
var addButton = document.getElementsByTagName("button")[0];
var TodoTasksHolder = document.getElementById("Todo");
var completedTasksHolder = document.getElementById("Completed");

var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); 
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
 
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// para maka add //
var addTask = function() {
  var listItem = createNewTaskElement(taskInput.value);
  TodoTasksHolder.appendChild(listItem);
  Events(listItem, Completed);  
  
  taskInput.value = "";   
}

// para maka edit //
var editTask = function() {
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
 
}

// para maka delete //
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

// list sa na human na //
var Completed = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  Events(listItem, Todo);
}

// mga task
var Todo = function() {
  var listItem = this.parentNode;
  TodoTasksHolder.appendChild(listItem);
  Events(listItem, Completed);
}

//para maka check edit or delete//
var Events = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
 
  editButton.onclick = editTask;
  
  
  deleteButton.onclick = deleteTask;
 
  checkBox.onchange = checkBoxEventHandler;
}

//ANG AJAX para dili na mag reload
var ajax = function() {
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajax);



for(var i = 0; i <  TodoTasksHolder.children.length; i++) {
  Events(TodoTasksHolder.children[i], Completed);
}
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  Events(completedTasksHolder.children[i], Todo); 

}