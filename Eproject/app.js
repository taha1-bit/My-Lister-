document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('clearBtn').addEventListener('click', clearTasks);

// Load tasks from Local Storage when page loads
window.onload = loadTasks;

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        let li = createTaskElement(taskText);
        taskList.appendChild(li);

        saveTask(taskText);

        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

// Create a task item with delete button
function createTaskElement(taskText) {
    let li = document.createElement('li');
    li.textContent = taskText;

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        updateStorage();
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent li click event
        li.remove();
        updateStorage();
    });

    li.appendChild(deleteBtn);
    return li;
}

// Save task to Local Storage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
        }
        document.getElementById('taskList').appendChild(li);
    });
}

// Update Local Storage after changes
function updateStorage() {
    let tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        localStorage.removeItem('tasks');
        document.getElementById('taskList').innerHTML = "";
    }
}
