const list = document.getElementById('todos');
document.querySelector('button').addEventListener('click', handleClick);
document.addEventListener('DOMContentLoaded', loadTodos)


function handleClick() {
    const newTodo = this.previousElementSibling.value.trim();

    if (newTodo) {
        createTodo(newTodo);
        saveToStorage(newTodo);
        this.previousElementSibling.value = '';
    } else {
        alert('там ничего нет')
    }
}

function saveToStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];

    localStorage.setItem('tasks', JSON.stringify([...todos, todo]));
}

function removeFromStorage(removedTodo) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];

    localStorage.setItem(
        'tasks',
        JSON.stringify(todos.filter((todo) => todo !== removedTodo))
    );
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('tasks'));

    if (todos) {
        todos.forEach(todo => createTodo(todo))
    }
}

function createTodo(text) {
    const li = document.createElement('li');
    li.innerText = text;
    li.className = 'todo-item';

    li.addEventListener('click', removeTodo);

    list.append(li);
}

function removeTodo() {
    this.removeEventListener('click', removeTodo)
    removeFromStorage(this.innerText);
    this.remove();
}