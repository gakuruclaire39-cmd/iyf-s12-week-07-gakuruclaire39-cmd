export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
        return todos.filter((todo) => todo.completed);
    }

    return todos;
}

export function countTodos(todos) {
    return {
        total: todos.length,
        active: todos.filter((todo) => !todo.completed).length,
        completed: todos.filter((todo) => todo.completed).length,
    };
}
