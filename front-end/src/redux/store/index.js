import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../features/tokenSlice';

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
