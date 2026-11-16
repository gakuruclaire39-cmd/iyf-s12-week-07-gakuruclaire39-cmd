export const saveTodos = (todos) => {
  if (todos === undefined) return;
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  } catch {
    return [];
  }
};
