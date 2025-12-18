import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(
        item => item.id === action.payload
      );
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
