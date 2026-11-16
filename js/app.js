import {
    addTodo,
    deleteTodo,
    toggleTodo,
    filterTodos,
    countTodos,
} from "./todo-logic.js";

import {
    saveTodos,
    saveFilter,
} from "./storage.js";

import {
    todos,
    setTodos,
    currentFilter,
    setFilter,
} from "./state.js";

import { render } from "./ui.js";

const list = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const itemsLeft = document.getElementById("items-left");
const clearCompletedButton = document.getElementById("clear-completed");

const filterButtons = document.querySelectorAll(".filter");

function update() {
    const visibleTodos = filterTodos(todos, currentFilter);
    const counts = countTodos(todos);

    render(visibleTodos, list, handleToggle, handleDelete);

    itemsLeft.textContent = `${counts.active} items left`;

    filterButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );
    });

    saveTodos(todos);
    saveFilter(currentFilter);
}

function handleToggle(id) {
    setTodos(toggleTodo(todos, id));
    update();
}

function handleDelete(id) {
    setTodos(deleteTodo(todos, id));
    update();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input.value.trim()) {
        return;
    }

    setTodos(addTodo(todos, input.value));
    input.value = "";
    update();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
        update();
    });
});

clearCompletedButton.addEventListener("click", () => {
    setTodos(todos.filter((todo) => !todo.completed));
    update();
});

update();
