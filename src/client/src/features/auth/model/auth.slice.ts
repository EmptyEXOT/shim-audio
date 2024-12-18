import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthModel } from '../types/AuthModel.interface';
import { authApi } from '../api/auth.api';
import { Cookies } from 'react-cookie';
import { COOKIE } from '@/shared/const/cookies.const';

const cookies = new Cookies();

const initialState: AuthModel = {
  accessToken: cookies.get(COOKIE.ACCESS_TOKEN),
  email: cookies.get(COOKIE.EMAIL),
  sessionId: cookies.get(COOKIE.SESSION_ID),
  userId: cookies.get(COOKIE.USER_ID),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthModel>) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.sessionId = action.payload.sessionId;
      state.userId = action.payload.userId;
      cookies.set(COOKIE.ACCESS_TOKEN, action.payload.accessToken, {
        path: '/',
      });
      cookies.set(COOKIE.EMAIL, action.payload.email, { path: '/' });
      cookies.set(COOKIE.SESSION_ID, action.payload.sessionId, { path: '/' });
      cookies.set(COOKIE.USER_ID, action.payload.userId, { path: '/' });
    },
    clearSession: (state) => {
      state.accessToken = null;
      state.email = null;
      state.sessionId = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.email = payload.email;
        state.sessionId = payload.sessionId;
        state.userId = payload.userId;
        cookies.set(COOKIE.ACCESS_TOKEN, payload.accessToken, { path: '/' });
        cookies.set(COOKIE.EMAIL, payload.email, { path: '/' });
        cookies.set(COOKIE.SESSION_ID, payload.sessionId, { path: '/' });
        cookies.set(COOKIE.USER_ID, payload.userId, { path: '/' });
      }
    );
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
