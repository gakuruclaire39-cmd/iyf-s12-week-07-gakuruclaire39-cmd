let idCounter = 1;

export function addTodo(todos, text) {
  const trimmed = text.trim();
  if (!trimmed) return todos;
  return [
    ...todos,
    { id: Date.now() + idCounter++, text: trimmed, completed: false },
  ];
}

export function toggleTodo(todos, id) {
  return todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
}

export function deleteTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

export function filterTodos(todos, filter) {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function countTodos(todos) {
  const active = todos.filter((t) => !t.completed).length;
  return { active, completed: todos.length - active, total: todos.length };
}

export function clearCompleted(todos) {
  return todos.filter((t) => !t.completed);
}
