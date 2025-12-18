import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTodosAPI,
  addTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '../api/todoApi';

/* ------------------ THUNKS ------------------ */

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, thunkAPI) => {
    const response = await fetchTodosAPI();
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (title) => {
    const response = await addTodoAPI({
      title,
      completed: false,
    });
    return response.data;
  }
);

export const toggleTodo = createAsyncThunk(
  'todo/toggleTodo',
  async (todo) => {
    const response = await updateTodoAPI(todo.id, {
      ...todo,
      completed: !todo.completed,
    });
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id) => {
    await deleteTodoAPI(id);
    return id;
  }
);

/* ------------------ SLICE ------------------ */

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // TOGGLE
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          t => t.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(
          t => t.id !== action.payload
        );
      });
  },
});

export default todoSlice.reducer;
