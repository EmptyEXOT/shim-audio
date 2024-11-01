import { createSlice } from '@reduxjs/toolkit';
import { AuthModel } from '../types/AuthModel.interface';
import { authApi } from '../api/auth.api';

const initialState: AuthModel = {
  accessToken: null,
  email: null,
  sessionId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.email = payload.email;
        state.sessionId = payload.sessionId;
      }
    );
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
