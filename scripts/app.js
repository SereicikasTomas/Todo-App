'use strict'

let todos = getSavedTodos();

const filterCont = {
  text: '',
  hideCompleted: false
};

const div = document.querySelector('#list');

renderTodos(todos, filterCont); 

document.querySelector('#filter-todos').addEventListener('input', (e) => {
  filterCont.text = e.target.value;
  renderTodos(todos, filterCont); 
})

document.querySelector('form').addEventListener('submit', e => {
  const text = e.target.elements.newTodo.value.trim();
  e.preventDefault();
  if(text.length > 0){
    todos.push({
      id: uuidv4(),
      title: text,
      completed: false
    })
    saveTodos(todos);
    renderTodos(todos, filterCont);
    e.target.elements.newTodo.value = '';  
  }
})

document.querySelector('#hide').addEventListener('change', e => {
  filterCont.hideCompleted = e.target.checked;
  renderTodos(todos, filterCont);
})