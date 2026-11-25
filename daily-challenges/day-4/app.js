const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

const tasks = [...]
function showError(message) {
    errorMessage.textContent = message;
}

function clearError() {
    errorMessage.textContent = "";
}

// Create a task element
function createTaskElement(task, index) {
    const listItem = document.createElement("li");
    const taskText = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskText.textContent = task;
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteTask(index);
    });

    listItem.append(taskText, deleteButton);

    return listItem;
}

// Display all tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.appendChild(createTaskElement(task, index));
    });
}

// Add a new task
function addTask(task) {
    const cleanedTask = task.trim();

    if (!cleanedTask) {
        showError("Please enter a task.");
        return;
    }

    if (tasks.includes(cleanedTask)) {
        showError("This task already exists.");
        return;
    }

    tasks.push(cleanedTask);

    clearError();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    if (index < 0 || index >= tasks.length) {
        showError("Task not found.");
        return;
    }

    tasks.splice(index, 1);

    clearError();
    renderTasks();
}

// Handle form submission
taskForm.addEventListener("submit", event => {
    event.preventDefault();

    try {
        addTask(taskInput.value);

        if (!errorMessage.textContent) {
            taskInput.value = "";
        }
    } catch (error) {
        showError("Something went wrong.");
        console.error(error);
    }
});

renderTasks();
