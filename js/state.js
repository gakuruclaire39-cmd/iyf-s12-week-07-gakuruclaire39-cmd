import { save, load } from "./storage.js";

export const state = {
  todos: load("todos", []),
  filter: load("filter", "all"),
  cart: { items: load("cart", []) },
};

export function commit() {
  save("todos", state.todos);
  save("filter", state.filter);
  save("cart", state.cart.items);
}
