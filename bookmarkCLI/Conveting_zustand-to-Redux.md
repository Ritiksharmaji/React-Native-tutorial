Great 👍
I’ll convert your **Zustand auth store** into **Redux Toolkit (RTK)** properly, using **slice + async thunks** (best practice).

Below is a **clean, production-ready Redux Toolkit version**.

---

# 📦 1. Install Required Packages

```bash
npm install @reduxjs/toolkit react-redux
npm install @react-native-async-storage/async-storage
```

---

# 🗂️ Folder Structure (Recommended)

```
src/
 ├── store/
 │    ├── index.js
 │    └── authSlice.js
```

---

# 🔐 2. `authSlice.js` (Redux Toolkit)

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

/* ---------------- REGISTER ---------------- */
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ---------------- LOGIN ---------------- */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ---------------- CHECK AUTH ---------------- */
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = await AsyncStorage.getItem("token");
  const userJson = await AsyncStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  return { token, user };
});

/* ---------------- LOGOUT ---------------- */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
});

/* ---------------- SLICE ---------------- */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* CHECK AUTH */
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
```

---

# 🏗️ 3. `store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

---

# 🌍 4. Wrap App with Redux Provider

```js
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      {/* Your Navigation */}
    </Provider>
  );
}
```

---

# 🧠 5. Usage in Components (Replace Zustand)

### ✅ Access state

```js
import { useSelector } from "react-redux";

const { user, token, isLoading } = useSelector((state) => state.auth);
```

### ✅ Dispatch actions

```js
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../store/authSlice";

const dispatch = useDispatch();

dispatch(loginUser({ email, password }));
dispatch(registerUser({ username, email, password }));
dispatch(logoutUser());
```

---

# 🔥 Zustand → Redux Mapping (Clear)

| Zustand          | Redux Toolkit        |
| ---------------- | -------------------- |
| `useAuthStore()` | `useSelector()`      |
| `login()`        | `loginUser thunk`    |
| `register()`     | `registerUser thunk` |
| `logout()`       | `logoutUser thunk`   |
| `checkAuth()`    | `checkAuth thunk`    |

---

## ✅ Result

* ✔ Fully **Redux Toolkit**
* ✔ AsyncStorage handled correctly
* ✔ Error handling added
* ✔ Production-ready structure

---

If you want next:

* 🔥 Convert **all components** from Zustand → Redux
* 🔥 Add **persisted redux** (auto rehydrate)
* 🔥 Add **middleware & logging**
* 🔥 Fix auth flow with navigation guards

Just say **“next step”** 🚀


## ------------- conveting login ----------------
You’re mixing **Zustand logic** with a **Redux Toolkit app** here — that’s why this screen needs a fix.

I’ll give you a **clean, correct Redux Toolkit + React Navigation (CLI)** version of this **LoginScreen**.

---

## ❌ Problems in your current code

1. ❌ Still using **Zustand**

```js
import { useAuthStore } from "../store/authStore";
```

2. ❌ Calling store function directly

```js
const { isLoading, login, isCheckingAuth } = useAuthStore();
```

3. ❌ Redux requires **dispatching thunks**, not calling functions

---

## ✅ Correct Redux Toolkit Version (FIXED)

### ✅ What this version does

* Uses `useDispatch` + `useSelector`
* Dispatches `loginUser`
* Handles error properly
* Fully **React Native CLI compatible**

---

## ✅ Fixed `LoginScreen.js` (Redux Toolkit)

```js
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import styles from "../assets/styles/login.styles";
import COLORS from "../constants/colors";
import { loginUser } from "../store/authSlice"; // ✅ redux thunk

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, isCheckingAuth, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    const result = await dispatch(
      loginUser({ email, password })
    );

    if (loginUser.rejected.match(result)) {
      Alert.alert("Login Failed", result.payload || "Something went wrong");
    }
  };

  if (isCheckingAuth) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* TOP IMAGE */}
        <View style={styles.topIllustration}>
          <Image
            source={require("../assets/images/i.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
```

---

## 🧠 Key Rule to Remember (VERY IMPORTANT)

| Zustand             | Redux Toolkit            |
| ------------------- | ------------------------ |
| `login()`           | `dispatch(loginUser())`  |
| Store has functions | Store has **state only** |
| Direct calls        | Dispatch actions         |

---

## ✅ You’re now doing **REAL production Redux**

If you want next:

* ✅ Signup screen Redux fix
* ✅ Auth-based navigation guard
* ✅ Redux Persist (auto-login)
* ✅ Token expiry handling

Just say **next** 🚀

## ----------- for signup -----------
Perfect 👍
This Signup screen is still **Zustand-based**, so I’ll **correctly convert it to Redux Toolkit + React Navigation (CLI)** — same UI, **proper Redux flow**.

---

## ❌ What’s wrong in current Signup code

1. ❌ Zustand store still used

```js
import { useAuthStore } from "../store/authStore";
```

2. ❌ Direct function call

```js
const { isLoading, register } = useAuthStore();
```

Redux requires **dispatching async thunks**, not calling functions.

---

## ✅ Fixed Signup Screen (Redux Toolkit)

### Uses:

* `useDispatch`
* `useSelector`
* `registerUser` thunk
* Proper error handling

---

## ✅ `SignupScreen.js` (Redux Toolkit – FINAL)

```js
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import styles from "../assets/styles/signup.styles";
import COLORS from "../constants/colors";
import { registerUser } from "../store/authSlice"; // ✅ redux thunk

export default function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    const result = await dispatch(
      registerUser({ username, email, password })
    );

    if (registerUser.rejected.match(result)) {
      Alert.alert("Signup Failed", result.payload || "Something went wrong");
    } else {
      Alert.alert("Success", "Account created successfully");
      navigation.goBack(); // Login screen
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm 🐛</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          <View style={styles.formContainer}>
            {/* USERNAME */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe"
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="******"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* SIGNUP BUTTON */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
```

---

## 🧠 Redux Rule (Lock this in your brain)

❌ Call store functions
✅ Dispatch async thunks

```js
dispatch(registerUser({ username, email, password }));
```

---

## ✅ You’ve now fully migrated:

✔ Login
✔ Signup
✔ Logout
✔ Auth Store

---

### Want next?

* 🔐 Auth-based navigation guard
* 💾 Redux Persist (auto-login)
* 📦 Clean folder structure
* 🚀 Release APK build

Just say **next** 😎
