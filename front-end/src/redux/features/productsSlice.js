import { createSlice } from '@reduxjs/toolkit';

export const productSlicer = createSlice({
  name: 'token',
  initialState: {
    totalQuantity: 0,
    totalValue: 0,
  },
  reducers: {
    incrementQuantity: (state) => {
      state.totalQuantity += 1;
    },
    decrementQuantity: (state) => {
      state.totalQuantity -= 1;
    },
    incrementValue: (state, action) => {
      state.totalValue = (state.totalQuantity * action.payload).toFixed(2);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementQuantity,
  decrementQuantity,
  incrementValue,
} = productSlicer.actions;

export default productSlicer.reducer;
