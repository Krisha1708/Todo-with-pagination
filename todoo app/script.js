// Base URL for the API
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Elements from the DOM
const todoList = document.getElementById('todo-list');
const pagination = document.getElementById('pagination');

// Variables for pagination
const todosPerPage = 10;
let currentPage = 1;
let totalTodos = 0;

// Function to fetch todos
const fetchTodos = async (page) => {
    try {
        const response = await fetch(`${BASE_URL}?_page=${page}&_limit=${todosPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const todos = await response.json();
        totalTodos = parseInt(response.headers.get('x-total-count')); // Get total count of todos from response header
        displayTodos(todos);
        displayPagination();
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

// Function to display todos
const displayTodos = (todos) => {
    todoList.innerHTML = ''; // Clear previous todos

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        
        const title = document.createElement('h3');
        title.textContent = todo.title;
        
        const status = document.createElement('p');
        status.textContent = todo.completed ? 'Completed' : 'Not Completed';

        todoItem.append(title, status);
        todoList.appendChild(todoItem);
    });
};

// Function to display pagination
const displayPagination = () => {
    const totalPages = Math.ceil(totalTodos / todosPerPage);

    pagination.innerHTML = ''; // Clear previous pagination buttons

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            fetchTodos(i); // Fetch todos for the selected page
        };
        pagination.appendChild(pageButton);
    }
};

// Initialize the app
fetchTodos(currentPage);
