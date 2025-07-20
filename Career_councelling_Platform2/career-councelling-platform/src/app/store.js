// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { auth } from '../features/auth/firebase';

// Create and export store instance
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['auth/setUser'],
      ignoredPaths: ['auth.user']
    }
  })
});

// Initialize auth listener
auth.onAuthStateChanged((user) => {
  store.dispatch({
    type: 'auth/setUser',
    payload: user ? {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      }
    } : null
  });
});

// Remove default export