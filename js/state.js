import { loadTodos, loadFilter } from "./storage.js";

export let todos = loadTodos();
export let currentFilter = loadFilter();

export function setTodos(newTodos) {
    todos = newTodos;
}

export function setFilter(newFilter) {
    currentFilter = newFilter;
}
