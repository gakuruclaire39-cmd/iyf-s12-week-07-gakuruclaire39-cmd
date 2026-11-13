import { filterTodos, countTodos } from "./todo-logic.js";

export function render(todos, filter, listEl, itemsLeftEl) {
    const filtered = filterTodos(todos, filter);
    const counts = countTodos(todos);

    listEl.innerHTML = filtered
        .map(
            (t) => `
        <li data-id="${t.id}" class="${t.completed ? "completed" : ""}">
            <div class="todo-item">
                <input type="checkbox" ${t.completed ? "checked" : ""} class="toggle">
                <span class="todo-text">${t.text}</span>
                <button class="delete">Delete</button>
            </div>
        </li>`
        )
        .join("");

    if (itemsLeftEl) {
        itemsLeftEl.textContent = `${counts.active} items left`;
    }
}
