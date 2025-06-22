// profileSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_key = import.meta.env.VITE_FIREBASE_API_KEY;

// Async Thunk to fetch user profile
export const fetchData = createAsyncThunk(
  "profile/fetchData",
  async (token, thunkApi) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`,
        {
          idToken: token,
        }
      );
      const user = res.data.users[0];
      return {
        name: user.displayName || "",
        email: user.email || "",
        photoUrl: user.photoUrl || "",
        emailVerified: user.emailVerified,
      };
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.error?.message || "Something went wrong");
    }
  }
);

// Async Thunk to update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ name, token, photoUrl }, thunkApi) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api_key}`,
        {
          idToken: token,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data?.error?.message || "Update failed");
    }
  }
);

// Initial State
const initialState = {
  name: "",
  email: "",
  photoUrl: "",
  emailVerified: false,
  error: null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEmailVerified(state, action) {
      state.emailVerified = action.payload;
    },
    clearProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.photoUrl = action.payload.photoUrl;
        state.emailVerified = action.payload.emailVerified;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.meta.arg.name;
        state.photoUrl = action.meta.arg.photoUrl;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmailVerified, clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;

