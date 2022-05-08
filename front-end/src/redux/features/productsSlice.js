import { createSlice } from '@reduxjs/toolkit';

const calculatePrice = (productList) => productList.reduce(
  (sum, product) => sum + (+product.price * product.quantity), 0,
);

export const productSlicer = createSlice({
  name: 'token',
  initialState: {
    cart: [],
    totalPrice: '0.00',
  },
  reducers: {
    handleCartProduct: (state, action) => {
      const received = action.payload;

      const productExists = state.cart.find((p) => p.id === received.id);

      if (!productExists) state.cart = [...state.cart, received];

      let updatedCart = state.cart.map((p) => ((p.id === received.id) ? received : p));

      updatedCart = updatedCart.filter((product) => product.quantity > 0);

      state.cart = [...updatedCart];

      state.totalPrice = calculatePrice(state.cart).toFixed(2);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleCartProduct,
} = productSlicer.actions;

export default productSlicer.reducer;
