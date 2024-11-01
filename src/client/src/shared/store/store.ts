import { authReducer } from '@/features/auth/model/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/emptySplitApi';
import { getDefaultConfig } from 'tailwind-merge';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
