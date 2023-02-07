const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const conten_li = document.querySelector(".li-container");
const empty = document.querySelector(".empty");
let todoList = [];


// EventListeners 
eventListeners()
function eventListeners() {
  addBtn.addEventListener("click", imprimirtodoList);
  document.addEventListener("DOMContentLoaded", () => {
    todoList = JSON.parse( localStorage.getItem('todos')) || [];

    if (todoList.length > 0) {
      
      mensajeAdvertencia("limpiar");
      agregarMsjDom(todoList);
    }
  });
}


// funciones

function imprimirtodoList(e) {
  e.preventDefault();

  const text = input.value;

  if (text.trim() !== "") {
    const nuevoTodo = {
      id: Date.now(),
      contenido: text
    };

    todoList = [...todoList, nuevoTodo];
    agregarMsjDom(todoList)
    mensajeAdvertencia("limpiar")
  } else {
    mensajeAdvertencia("error");
  };
};
function agregarMsjDom(arr) {

  ul.innerHTML = "";
  
  arr.forEach(element => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

    p.textContent = element.contenido;
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", () => {
      const items = document.querySelectorAll("li");

      borrarTodo(element.id);

      if (items.length === 0) {
        empty.style.display = "block";
      }
    });

    
    li.appendChild(p);
    ul.appendChild(li);
    li.appendChild(deleteBtn);

  });
  sincronizarStorage();
}
function mensajeDeError() {
  limpiarMsjError()

  const mensajeError = document.createElement("p");

  mensajeError.textContent = "El mensaje es vacio";
  mensajeError.className = "msjError";

  conten_li.insertBefore(mensajeError, ul);

  setTimeout(function() {
    limpiarMsjError()
  }, 2000);
}
function limpiarMsjError() {
  // Comprueba si ya existe una alerta
  const msjErr = conten_li.querySelector('.msjError');
  if(msjErr) {
    conten_li.removeChild(msjErr);
  }
}
function sincronizarStorage() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}
function borrarTodo(id) {
    todoList = todoList.filter( todo => todo.id !== id );
    agregarMsjDom(todoList)
    if(todoList.length === 0) {
      mensajeAdvertencia("vacio")
    } 
}
function mensajeAdvertencia(tipo) {
  switch (tipo) {
    case "error": 
      mensajeDeError()
      break;
    case "limpiar":
      input.value = "";
      empty.style.display = "none";
      break;
    case "vacio":
      empty.style.display = "block";
  }
}