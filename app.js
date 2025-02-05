"use strict";

const inputElement = document.getElementById("title");
const createBtn = document.getElementById("create");
const listElement = document.getElementById("list");

const notes = [
  {
    title: "записать блок про массивы",
    completed: false,
  },
  {
    title: "рассказать теорию объектов",
    completed: false,
  },
];

function render() {
  listElement.innerHTML = "";
  if (notes.length === 0) {
    listElement.insertAdjacentHTML("beforeend", "<p>Нет элементов</p>");
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}
render();

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
      console.log("toggle", 0);
    } else if (type === "remove") {
      notes.splice(index, 1);
      console.log("remove");
    }
    render();
  }
};

function getNoteTemplate(note, i) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="${note.completed ? "text-decoration-line-through" : ""}">${
    note.title
  }</span>
        <span>
          <span class="btn btn-small btn-${
            note.completed ? "warning" : "success"
          }" data-index="${i}" data-type="toggle">&check;</span>
          <span class="btn btn-small btn-danger" data-index="${i}" data-type="remove">&times;</span>
        </span>
      </li>`;
}

createBtn.onclick = function () {
  if (!inputElement.value.trim()) return;
  const newNote = {
    title: inputElement.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputElement.value = "";
};
