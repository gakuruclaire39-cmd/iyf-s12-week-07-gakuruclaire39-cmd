function saveToStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getFromStorage(key, def = null) {
  const d = localStorage.getItem(key);
  if (d === null) { return def; }
  try { return JSON.parse(d); } catch { return def; }
}
let todos = getFromStorage("todos13", []);
let filter = getFromStorage("filter13", "all");
const list = document.getElementById("todoList");
const countEl = document.getElementById("count");
function render() {
  let shown = todos;
  if (filter === "active") { shown = todos.filter(t => !t.done); }
  if (filter === "completed") { shown = todos.filter(t => t.done); }
  list.innerHTML = shown.map(t => `
    <div style="display:flex;gap:10px;padding:8px;background:white;margin:6px 0;border-radius:10px">
      <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggleTodo(${t.id})">
      <span style="flex:1;text-decoration:${t.done ? "line-through" : "none"}">${t.text}</span>
      <button onclick="delTodo(${t.id})">Delete</button>
    </div>`).join("");
  const remaining = todos.filter(t => !t.done).length;
  countEl.textContent = `${remaining} remaining`;
}
function toggleTodo(id) {
  todos = todos.map(t => {
    if (t.id === id) { return { ...t, done: !t.done }; }
    return t;
  });
  saveToStorage("todos13", todos);
  render();
}
function delTodo(id) { todos = todos.filter(t => t.id !== id); saveToStorage("todos13", todos); render(); }
window.toggleTodo = toggleTodo;
window.delTodo = delTodo;
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) { return; }
  todos = [...todos, { id: Date.now(), text, done: false }];
  saveToStorage("todos13", todos);
  input.value = "";
  render();
});
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    saveToStorage("filter13", filter);
    render();
  });
});
render();
