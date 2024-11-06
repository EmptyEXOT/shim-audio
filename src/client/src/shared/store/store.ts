import { authReducer } from '@/features/auth/model/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/emptySplitApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
