import { addTodo, deleteTodo, toggleTodo } from './todo-logic.js';
import { saveTodos } from './storage.js';
import { todos, setTodos } from './state.js';
import { render } from './ui.js';

const list = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

function update() {
  render(todos, list, handleToggle, handleDelete);
  saveTodos(todos);
}
function handleToggle(id) {
  setTodos(toggleTodo(todos, id));
  update();
}
function handleDelete(id) {
  setTodos(deleteTodo(todos, id));
  update();
}
form?.addEventListener('submit', e => {
  e.preventDefault();
  if(!input.value.trim()) return;
  setTodos(addTodo(todos, input.value));
  input.value='';
  update();
});
update();
