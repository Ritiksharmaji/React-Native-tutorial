import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
};

// Actions
const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  SET_CHECKING_AUTH: "SET_CHECKING_AUTH",
  LOGOUT: "LOGOUT",
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_USER:
      return { 
        ...state, 
        user: action.payload.user, 
        token: action.payload.token, 
        isLoading: false, 
        error: null 
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.SET_CHECKING_AUTH:
      return { ...state, isCheckingAuth: action.payload };
    case ACTIONS.LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

// Context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check auth on app start
  useEffect(() => {
    checkAuth();
  }, []);

  // const registerUser = async ({ username, email, password }) => {
  //   dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  //   try {
  //     const res = await fetch(`${API_URL}/auth/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, email, password }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message || "Registration failed");

  //     await AsyncStorage.setItem("token", data.token);
  //     await AsyncStorage.setItem("user", JSON.stringify(data.user));

  //     dispatch({ type: ACTIONS.SET_USER, payload: data });
  //   } catch (error) {
  //     dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
  //   }
  // };
  const registerUser = async (username, email, password) => {
  dispatch({ type: ACTIONS.SET_LOADING, payload: true });

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));

    dispatch({ type: ACTIONS.SET_USER, payload: data });

    return { success: true };
  } catch (error) {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    return { success: false, error: error.message };
  }
};


  const loginUser = async ({ email, password }) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      dispatch({ type: ACTIONS.SET_USER, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const checkAuth = async () => {
    dispatch({ type: ACTIONS.SET_CHECKING_AUTH, payload: true });
    const token = await AsyncStorage.getItem("token");
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    dispatch({ type: ACTIONS.SET_USER, payload: { user, token } });
    dispatch({ type: ACTIONS.SET_CHECKING_AUTH, payload: false });
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
