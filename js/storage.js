export const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));
export const loadTodos = () => JSON.parse(localStorage.getItem('todos') || '[]');
