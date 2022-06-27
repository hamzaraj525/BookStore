import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  compose,
} from '@reduxjs/toolkit';

import cartReducer from './Reducer/addToCartReducer';

const reducers = combineReducers({
  cartReducer: cartReducer,
});

const store = configureStore({
  reducer: {reducers},
});
export default store;
