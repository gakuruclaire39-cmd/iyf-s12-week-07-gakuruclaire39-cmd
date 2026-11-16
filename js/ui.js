export function render(todos, container, onToggle, onDelete) {
  container.innerHTML = todos.map(todo => `<li><input type="checkbox" ${todo.completed?'checked':''} data-id="${todo.id}" class="toggle"><span>${todo.text}</span><button data-id="${todo.id}" class="delete">Delete</button></li>`).join('');
  container.querySelectorAll('.toggle').forEach(el=>el.addEventListener('change', e=>onToggle(Number(e.target.dataset.id))));
  container.querySelectorAll('.delete').forEach(el=>el.addEventListener('click', e=>onDelete(Number(e.target.dataset.id))));
}
