// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Helper to get error message
const getErrorMessage = (error) => {
  return error?.message || 'An error occurred';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { user, error } = await authService.register(userData);
      if (error) throw new Error(error);
      return user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { user, error } = await authService.login(credentials);
      if (error) throw new Error(error);
      return user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user) throw new Error('User not authenticated');
      
      // Update profile in Firebase
      const { error } = await authService.updateUserProfile(user.uid, profileData);
      if (error) throw new Error(error);
      
      // Return merged profile data
      const updatedUser = {
        ...user,
        ...profileData
      };
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loadUserProfile = createAsyncThunk(
  'auth/loadProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user) throw new Error('User not authenticated');
      
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) throw new Error('User profile not found');
      
      return currentUser;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  profileLoading: false,
  profileError: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.profileLoading = false;
      state.profileError = false;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateProfileLocally: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Register/Login cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Profile update cases
      .addCase(updateUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = true;
        state.message = action.payload;
      })
      
      // Load profile cases
      .addCase(loadUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = false;
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout, updateProfileLocally } = authSlice.actions;
export default authSlice.reducer;