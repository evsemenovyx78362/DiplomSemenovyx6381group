import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// ...

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    // ... логика запроса к API
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        // ...
      })
      // ... обработка других состояний
  },
});

export default authSlice.reducer;
