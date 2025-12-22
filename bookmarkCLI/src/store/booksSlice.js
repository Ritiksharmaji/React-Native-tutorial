import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";

/* ================= FETCH BOOKS ================= */
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, refresh = false }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(
        `${API_URL}/books?page=${page}&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { data, page, refresh };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= CREATE BOOK ================= */
export const createBook = createAsyncThunk(
  "books/createBook",
  async ({ title, caption, rating, imageBase64 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: `data:image/jpeg;base64,${imageBase64}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


/* ================= USER BOOKS ================= */
export const fetchUserBooks = createAsyncThunk(
  "books/fetchUserBooks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= DELETE BOOK ================= */
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= SLICE ================= */
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    refreshing: false,
    page: 1,
    hasMore: true,
    error: null,
    userBooks: [],
    loading: false,
    deletingId: null,
  },
  reducers: {
    resetBooks: (state) => {
      state.books = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBooks.pending, (state, action) => {
        if (action.meta.arg.refresh) state.refreshing = true;
        else state.loading = true;
      })
    .addCase(fetchBooks.fulfilled, (state, action) => {
        const { data, page, refresh } = action.payload;

        state.books =
          refresh || page === 1
            ? data.books
            : [...state.books, ...data.books].filter(
                (b, i, self) =>
                  i === self.findIndex((x) => x._id === b._id)
              );

        state.page = page;
        state.hasMore = page < data.totalPages;
        state.loading = false;
        state.refreshing = false;
      })
    .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload;
      })
    .addCase(createBook.pending, (state) => {
        state.loading = true;
        })
    .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload.book);
        })
    .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })
    .addCase(fetchUserBooks.pending, (state) => {
        state.loading = true;
        })
    .addCase(fetchUserBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.userBooks = action.payload;
        })
    .addCase(fetchUserBooks.rejected, (state) => {
        state.loading = false;
        })

    .addCase(deleteBook.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        })
    .addCase(deleteBook.fulfilled, (state, action) => {
        state.userBooks = state.userBooks.filter(
            (book) => book._id !== action.payload
        );
        state.deletingId = null;
        })
    .addCase(deleteBook.rejected, (state) => {
        state.deletingId = null;
        });

    },
    });

export const { resetBooks } = booksSlice.actions;
export default booksSlice.reducer;
