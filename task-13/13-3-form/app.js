const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const messageEl = document.getElementById("message");
const statusEl = document.getElementById("status");
function loadDraft() {
  const draft = sessionStorage.getItem("formDraft13");
  if (draft) {
    try {
      const data = JSON.parse(draft);
      nameEl.value = data.name || "";
      emailEl.value = data.email || "";
      messageEl.value = data.message || "";
      statusEl.textContent = "Draft restored";
    } catch {
      statusEl.textContent = "";
    }
  }
}
function saveDraft() {
  const data = { name: nameEl.value, email: emailEl.value, message: messageEl.value };
  sessionStorage.setItem("formDraft13", JSON.stringify(data));
  statusEl.textContent = "Draft saved at " + new Date().toLocaleTimeString();
}
function clearDraft() {
  sessionStorage.removeItem("formDraft13");
  nameEl.value = "";
  emailEl.value = "";
  messageEl.value = "";
  statusEl.textContent = "Draft cleared";
}
[nameEl, emailEl, messageEl].forEach(el => {
  el.addEventListener("input", saveDraft);
});
document.getElementById("saveBtn").addEventListener("click", saveDraft);
document.getElementById("clearBtn").addEventListener("click", clearDraft);
loadDraft();
