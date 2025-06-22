import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  tokenExpiration: localStorage.getItem("tokenExpiration") || null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload,
      state.isLoggedIn = true,
      state.tokenExpiration = Date.now() + 3600000;
      localStorage.setItem("token", action.payload);
      localStorage.setItem("tokenExpiration", state.tokenExpiration);
    },
    logout(state) {
      state.token = null;
      state.tokenExpiration = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
