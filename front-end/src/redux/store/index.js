import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/tokenSlice';
import productsReducer from '../features/productsSlice';

export default configureStore({
  reducer: {
    token: tokenReducer,
    products: productsReducer,
  },
});
