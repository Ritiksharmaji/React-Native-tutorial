import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
    clearTodos: (state) => {
      state.list = [];
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
