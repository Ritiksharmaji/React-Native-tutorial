import React, { createContext, useReducer, useContext } from "react";
import { API_URL } from "../constants/api";
import { AuthContext } from "./AuthContext";

const initialState = {
  books: [],
  loading: false,
  refreshing: false,
  page: 1,
  hasMore: true,
  error: null,
  userBooks: [],
  deletingId: null,
};

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_REFRESHING: "SET_REFRESHING",
  SET_BOOKS: "SET_BOOKS",
  APPEND_BOOKS: "APPEND_BOOKS",
  SET_USER_BOOKS: "SET_USER_BOOKS",
  SET_ERROR: "SET_ERROR",
  SET_DELETING_ID: "SET_DELETING_ID",
  RESET_BOOKS: "RESET_BOOKS",
};

function booksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_REFRESHING:
      return { ...state, refreshing: action.payload };
    case ACTIONS.SET_BOOKS:
      return { ...state, books: action.payload.books, page: action.payload.page, hasMore: action.payload.hasMore, loading: false, refreshing: false };
    case ACTIONS.APPEND_BOOKS:
      return { 
        ...state, 
        books: [...state.books, ...action.payload.books],
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        loading: false,
        refreshing: false,
      };
    case ACTIONS.SET_USER_BOOKS:
      return { ...state, userBooks: action.payload, loading: false };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false, refreshing: false };
    case ACTIONS.SET_DELETING_ID:
      return { ...state, deletingId: action.payload };
    case ACTIONS.RESET_BOOKS:
      return { ...state, books: [], page: 1, hasMore: true };
    default:
      return state;
  }
}

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);
  const { token } = useContext(AuthContext);

  const fetchBooks = async ({ page = 1, refresh = false } = {}) => {
    if (!token) return;
    if (refresh) dispatch({ type: ACTIONS.SET_REFRESHING, payload: true });
    else dispatch({ type: ACTIONS.SET_LOADING, payload: true });

    try {
      const res = await fetch(`${API_URL}/books?page=${page}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const booksPayload = { books: data.books, page, hasMore: page < data.totalPages };
      if (refresh || page === 1) dispatch({ type: ACTIONS.SET_BOOKS, payload: booksPayload });
      else dispatch({ type: ACTIONS.APPEND_BOOKS, payload: booksPayload });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const fetchUserBooks = async () => {
    if (!token) return;
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(`${API_URL}/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: ACTIONS.SET_USER_BOOKS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const createBook = async ({ title, caption, rating, imageBase64 }) => {
    if (!token) return;
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ title, caption, rating: rating.toString(), image: `data:image/jpeg;base64,${imageBase64}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchBooks({ page: 1, refresh: true }); // refresh list
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const deleteBook = async (bookId) => {
    if (!token) return;
    dispatch({ type: ACTIONS.SET_DELETING_ID, payload: bookId });
    try {
      const res = await fetch(`${API_URL}/books/${bookId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      dispatch({ type: ACTIONS.SET_USER_BOOKS, payload: state.userBooks.filter(b => b._id !== bookId) });
      dispatch({ type: ACTIONS.SET_DELETING_ID, payload: null });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_DELETING_ID, payload: null });
    }
  };

  return (
    <BooksContext.Provider
      value={{
        ...state,
        fetchBooks,
        fetchUserBooks,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
