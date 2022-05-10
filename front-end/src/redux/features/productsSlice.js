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

      localStorage.setItem('cart', JSON.stringify({
        cart: state.cart, totalPrice: state.totalPrice }));
    },
    handleNewPage: (state) => {
      const cartStorage = JSON.parse(localStorage.getItem('cart'));
      state.totalPrice = cartStorage.totalPrice;
      state.cart = cartStorage.cart;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleNewPage,
  handleCartProduct,
} = productSlicer.actions;

export default productSlicer.reducer;
