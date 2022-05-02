import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken } = counterSlice.actions;

export default counterSlice.reducer;
