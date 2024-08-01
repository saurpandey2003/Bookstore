import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: 'user',
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token, role } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.role = role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.address=null;
      state.email=null;
      state.role = 'user';
    },
    changerole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { login, logout, changerole } = authSlice.actions;
export default authSlice.reducer;
