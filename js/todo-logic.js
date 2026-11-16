export function addTodo(todos, text) {
    const trimmedText = text.trim();

    if (!trimmedText) {
        return todos;
    }

    const newTodo = {
        id: Date.now(),
        text: trimmedText,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    return [...todos, newTodo];
}

export function toggleTodo(todos, id) {
    return todos.map((todo) =>
        todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
    );
}

export function deleteTodo(todos, id) {
    return todos.filter((todo) => todo.id !== id);
}

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
