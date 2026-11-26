function saveToStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getFromStorage(key, def = null) {
  const d = localStorage.getItem(key);
  if (d === null) { return def; }
  try { return JSON.parse(d); } catch { return def; }
}
let notes = getFromStorage("notes13", []);
const notesDiv = document.getElementById("notes");
function render() {
  if (notes.length === 0) {
    notesDiv.innerHTML = "<p>No notes</p>";
  } else {
    notesDiv.innerHTML = notes.map(n => `
    <div style="background:white;padding:10px;margin:8px 0;border-radius:12px;display:flex;justify-content:space-between">
      <div><b>${n.title}</b><br>${n.content}</div>
      <button onclick="delNote(${n.id})">Delete</button>
    </div>`).join("");
  }
}
function delNote(id) { notes = notes.filter(n => n.id !== id); saveToStorage("notes13", notes); render(); }
window.delNote = delNote;
document.getElementById("addBtn").addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (!title && !content) { return; }
  notes = [...notes, { id: Date.now(), title, content }];
  saveToStorage("notes13", notes);
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  render();
});
render();
