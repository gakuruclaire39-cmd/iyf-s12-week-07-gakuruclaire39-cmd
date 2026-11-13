import { addTodo, deleteTodo, toggleTodo } from '../js/todoLogic.js';

describe('Todo Logic', () => {
  test('should add a new todo', () => {
    const todos = [];
    const newTodos = addTodo(todos, 'Learn ES Modules');
    expect(newTodos.length).toBe(1);
    expect(newTodos[0].text).toBe('Learn ES Modules');
  });

  test('should delete a todo', () => {
    const todos = [{ id: 1, text: 'Test' }];
    const newTodos = deleteTodo(todos, 1);
    expect(newTodos.length).toBe(0);
  });

  test('should toggle a todo', () => {
    const todos = [{ id: 1, text: 'Test', completed: false }];
    const newTodos = toggleTodo(todos, 1);
    expect(newTodos[0].completed).toBe(true);
  });
});
