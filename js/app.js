import { state, commit } from "./state.js";
import { addTodo, toggleTodo, deleteTodo } from "./todo-logic.js";
import { render } from "./ui.js";

const input = document.getElementById("todo-input");
const form = document.getElementById("todo-form");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");
const filters = document.querySelectorAll(".filter");

function redraw() {
    render(state.todos, state.filter, list, itemsLeft);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const next = addTodo(state.todos, input.value);
    if (next.length !== state.todos.length) {
        state.todos = next;
        input.value = "";
        commit();
        redraw();
    }
});

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains("toggle")) {
        state.todos = toggleTodo(state.todos, id);
        commit();
        redraw();
    }
    if (e.target.classList.contains("delete")) {
        state.todos = deleteTodo(state.todos, id);
        commit();
        redraw();
    }
});

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        state.filter = btn.dataset.filter;
        commit();
        redraw();
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        state.todos = state.todos.filter((t) => !t.completed);
        commit();
        redraw();
    });
}

redraw();
