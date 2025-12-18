import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodosAPI = () => API.get('/todos?_limit=10');
export const addTodoAPI = (todo) => API.post('/todos', todo);
export const updateTodoAPI = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodoAPI = (id) => API.delete(`/todos/${id}`);
