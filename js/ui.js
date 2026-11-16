export function render(todos, container, onToggle, onDelete) {
    if (!container) {
        return;
    }

    container.innerHTML = todos
        .map(
            (todo) => `
            <li>
                <input
                    type="checkbox"
                    ${todo.completed ? "checked" : ""}
                    data-id="${todo.id}"
                    class="toggle"
                    aria-label="Mark ${todo.text} as completed"
                >
                <span>${todo.text}</span>
                <button
                    data-id="${todo.id}"
                    class="delete"
                    aria-label="Delete ${todo.text}"
                >
                    Delete
                </button>
            </li>
        `
        )
        .join("");

    container.onclick = (event) => {
        const id = Number(event.target.dataset.id);

        if (event.target.classList.contains("delete")) {
            onDelete(id);
        }
    };

    container.onchange = (event) => {
        const id = Number(event.target.dataset.id);

        if (event.target.classList.contains("toggle")) {
            onToggle(id);
        }
    };
}
