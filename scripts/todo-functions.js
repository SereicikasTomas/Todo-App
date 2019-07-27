'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  let data = localStorage.getItem('todo');
  //Check if the value for parsing is correct
  try{
    return data ? JSON.parse(data): [];
  }catch(e){
    return [];
  }
}

// Remove todo 
const removeTodo = (id) => {
  const index = todos.findIndex(item => item.id == id);

  if(index > -1){
    todos.splice(index, 1);
  }
}

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todo', JSON.stringify(todos));
}

// Toggle a completed value of todo
const toggleTodo = (id) => {
  const todo = todos.find(item => item.id == id);
  if(todo){
    todo.completed = !todo.completed;
  }
}

// Render application todos based on filters
const renderTodos = (todos, filter) => {
  const todoEl = document.querySelector('#list');
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.title.toLowerCase().includes(filter.text.toLowerCase());
    const hideCompletedMatch = filter.hideCompleted? !todo.completed: true;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(item => !item.completed);
  
  todoEl.innerHTML = '';
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if(filteredTodos.length > 0){
    filteredTodos.forEach(item => todoEl.appendChild(generateTodoDOM(item)));
  }else{
    const messageEl = document.createElement('p');
    messageEl.classList.add('empty-message');
    messageEl.textContent = 'No todos to show';
    todoEl.appendChild(messageEl);
  }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (item) => {
  const div = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');

  // Setup checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = item.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(item.id);
    saveTodos(todos);
    renderTodos(todos, filterCont);
  })

  // Setup span
  span.textContent = item.title;
  containerEl.appendChild(span);

  // Setup container
  div.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  div.appendChild(containerEl);

  // Setup button
  button.textContent = 'Delete';
  button.classList.add('button', 'button--text');
  div.appendChild(button);
  button.addEventListener('click', () => {
    removeTodo(item.id);
    saveTodos(todos);
    renderTodos(todos, filterCont);
  });

  return div;
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  if(incompleteTodos.length == 1){
    summary.textContent = `You have ${incompleteTodos.length} todo left.`
  }else{
    summary.textContent = `You have ${incompleteTodos.length} todos left.`
  }
  return summary;
}