document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterOption = document.querySelector(".filter-todo");
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("click", filterTodo);

  //Check local Storage
  getTodos();

  //Functions
  function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") {
      alert("Write your task");
    } else {
      //Create div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create li
      const newTodo = document.createElement("li");
      newTodo.classList.add("todo-item");
      newTodo.innerText = todoInput.value;
      todoDiv.appendChild(newTodo);
      //ADD todo to local storage
      saveLocalTodos(todoInput.value);
      //Check mark
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Delete Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //Append all to DOM
      todoList.appendChild(todoDiv);

      //Clear input
      todoInput.value = "";
    }
  }
  function deleteCheck(e) {
    const target = e.target;
    //Delete todo
    if (target.classList.contains("trash-btn")) {
      target.parentNode.remove();
      removeLocalTodos(target.parentNode);
    }
    //Check mark
    if (target.classList.contains("complete-btn")) {
      const todo = target.parentNode;
      todo.classList.toggle("completed");
    }
  }

  function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            todo.style.display = "none";
          } else {
            todo.style.display = "flex";
          }
          break;
      }
    });
  }

  function saveLocalTodos(todo) {
    //Check
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create li
      const newTodo = document.createElement("li");
      newTodo.classList.add("todo-item");
      newTodo.innerText = todo;
      todoDiv.appendChild(newTodo);
      //Check mark
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Delete Button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //Append all to DOM
      todoList.appendChild(todoDiv);
    });
  }

  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    //Get text from out todo item
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
