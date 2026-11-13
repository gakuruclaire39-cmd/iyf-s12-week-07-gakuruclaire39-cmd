import { load, save } from "./storage.js";

const saved = load();

export const state = {
  todos: saved.todos || [],
  filter: saved.filter || "all",
  cart: saved.cart || { items: [] },
};

export function commit() {
  save(state);
}
