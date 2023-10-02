const addForm = document.querySelector(".addForm");
let todos = document.querySelector(".todos");
let completedTodos = document.querySelector('.completedTodos');

let arrayOfTodos = [];

if (localStorage.getItem("todos")) {
    arrayOfTodos = JSON.parse(localStorage.getItem("todos"));
}

getData();

todos.addEventListener("click", (e) => {
    // Delete button
    if (e.target.classList.contains("deleteBtn")) {
        deleteTodo(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.remove();
    }
    // toggle completed
    if (e.target.classList.contains('checked')) {
        toggleCompleted(e.target.parentElement.parentElement.getAttribute("data-id"), e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.classList.toggle('completed')
    }
    // edit modal
    if (e.target.classList.contains('editBtn')) {
        editForm.setAttribute('edit-id', e.target.parentElement.parentElement.getAttribute('data-id'))
        arrayOfTodos.forEach(todo => {
            if (todo.id == editForm.getAttribute('edit-id')) {
                editForm['titleEdit'].value = todo.title;
                editForm['descEdit'].value = todo.desc;
            }
        })
        editModalToggle()
    }
});

completedTodos.addEventListener("click", (e) => {
    // Delete button
    if (e.target.classList.contains("deleteBtn")) {
        deleteTodo(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.remove();
    }
    // toggle completed
    if (e.target.classList.contains('checked')) {
        toggleCompleted(e.target.parentElement.parentElement.getAttribute("data-id"), e.target.parentElement.parentElement)
        e.target.parentElement.parentElement.classList.toggle('completed')
    }
});

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = addForm["title"].value;
    let desc = addForm["desc"].value;

    addTodo(title, desc);
    addForm.reset();
});

function addTodo(title, desc) {
    const todo = {
        id: Date.now(),
        title,
        desc,
        completed: false,
    };
    arrayOfTodos.push(todo);
    addElements(arrayOfTodos);
    addToLocalStorage(arrayOfTodos);
}

function addElements(array) {
    // Empty todos
    todos.innerHTML = "";
    completedTodos.innerHTML = "";
    array.forEach((todo) => {
        let todoEle = document.createElement("div");
        todoEle.className = "todo";
        if (todo.completed) {
            todoEle.className = "todo completed";
        }
        todoEle.setAttribute("data-id", todo.id);

        let todoTop = document.createElement("div");
        todoTop.className = "todo-top";
        let title = document.createElement("h3");
        title.className = "title";
        title.innerHTML = todo.title;
        todoTop.appendChild(title);
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = "checked";
        if (todo.completed) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }
        todoTop.appendChild(checkbox);
        todoEle.appendChild(todoTop);

        let description = document.createElement("p");
        description.className = "description";
        description.innerHTML = todo.desc;
        todoEle.appendChild(description);

        let todoButtons = document.createElement("div");
        todoButtons.className = "todoButtons";
        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.innerHTML = `<i class="fa fa-pencil"></i><span>Edit</span>`;
        todoButtons.appendChild(editBtn);
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.innerHTML = `<i class="fa fa-trash"></i><span>Delete</span>`;
        todoButtons.appendChild(deleteBtn);
        todoEle.appendChild(todoButtons);
        if (todo.completed) {
            completedTodos.appendChild(todoEle)
        } else {
            todos.appendChild(todoEle);
        }
    });
}

function addToLocalStorage(array) {
    localStorage.setItem("todos", JSON.stringify(array));
}

function getData() {
    let data = localStorage.getItem("todos");
    if (data) {
        let todosList = JSON.parse(data);
        addElements(todosList);
    }
}

function deleteTodo(id) {
    arrayOfTodos = arrayOfTodos.filter((todo) => todo.id != id);
    addToLocalStorage(arrayOfTodos);
}

function toggleCompleted(id, element) {
    for (let i = 0; i < arrayOfTodos.length; i++) {
        if (arrayOfTodos[i].id == id) {
            arrayOfTodos[i].completed == false ? (arrayOfTodos[i].completed = true) : (arrayOfTodos[i].completed = false)
            // if (!arrayOfTodos[i].completed) {
            //     completedTodos.children[i].remove();
            //     todos.appendChild(element)
            // } else {
            //     todos.children[i].remove();
            //     completedTodos.appendChild(element)
            // }
            arrayOfTodos[i].completed == false ? (todos.appendChild(element)) : (completedTodos.appendChild(element))
        }
        addToLocalStorage(arrayOfTodos)
    }
}

// edit modal
const editModal = document.querySelector('.editModal');
const closeModalBtn = document.querySelector('.closeModal');
const editForm = document.querySelector('.editForm');

function editModalToggle() {
    editModal.classList.toggle('active');
}

closeModalBtn.addEventListener('click', editModalToggle)

editForm.addEventListener('submit', e => {
    e.preventDefault();

    let title = editForm['titleEdit'].value;
    let desc = editForm['descEdit'].value;

    editTodo(title, desc)
    editModalToggle();
})

function editTodo(title, desc) {
    arrayOfTodos.forEach(todo => {
        if (todo.id == editForm.getAttribute('edit-id')) {
            if (title == '') {
                title = todo.title
            }
            todo.title = title;
            todo.desc = desc;
        }
    })
    addToLocalStorage(arrayOfTodos);
    addElements(arrayOfTodos)
}