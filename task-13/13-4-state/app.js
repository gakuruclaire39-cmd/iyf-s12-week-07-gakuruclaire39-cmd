function saveToStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getFromStorage(key, def = null) {
  const d = localStorage.getItem(key);
  if (d === null) { return def; }
  try { return JSON.parse(d); } catch { return def; }
}
let state = getFromStorage("state13", { count: 0, name: "Guest", history: [] });
const countEl = document.getElementById("count");
const nameDisplay = document.getElementById("nameDisplay");
const historyEl = document.getElementById("history");
const nameInput = document.getElementById("nameInput");
function render() {
  countEl.textContent = state.count;
  nameDisplay.textContent = state.name;
  nameInput.value = "";
  if (state.name !== "Guest") { nameInput.value = state.name; }
  historyEl.textContent = state.history.join(" -> ");
}
function setState(patch) {
  state = { ...state, ...patch };
  saveToStorage("state13", state);
  render();
}
document.getElementById("incBtn").addEventListener("click", () => {
  setState({ count: state.count + 1, history: [...state.history, "inc"] });
});
document.getElementById("decBtn").addEventListener("click", () => {
  setState({ count: state.count - 1, history: [...state.history, "dec"] });
});
document.getElementById("resetBtn").addEventListener("click", () => {
  setState({ count: 0, history: [] });
});
nameInput.addEventListener("input", () => {
  const name = nameInput.value.trim();
  if (name) { setState({ name }); }
});
render();
