import { loadTodos } from './storage.js';
export let todos = loadTodos();
export function setTodos(newTodos) { todos = newTodos; }
