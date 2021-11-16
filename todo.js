/* getting all required elements.With the help of document.querySelector() method we are storing html elements 
with specific class to their respective constants. */

const todoinput = document.querySelector(".inputField input");
const todoBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deletetodo = document.querySelector(".footer button");

// onkeyup event, onkeyup event occurs when the user releases a key on a keyboard.
todoinput.onkeyup = ()=>{
  let userEnteredValue = todoinput.value; //getting user entered todo list
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    todoBtn.classList.add("active"); //add button activates
  }else{
    todoBtn.classList.remove("active"); //add button deactivates
  }
}

showTasks(); //calling showTask function

todoBtn.onclick = ()=>{ //when user click on add button
  let userEnteredValue = todoinput.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  todoBtn.classList.remove("active"); //deactivate the add button once the task added
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deletetodo.classList.add("active"); //active the delete button
  }else{
    deletetodo.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  todoinput.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deletetodo.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    listArray = []; //create a blank array
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}
