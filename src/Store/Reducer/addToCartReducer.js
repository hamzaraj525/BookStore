import {ADD_TO_CART} from '../Action/addToCart';
import {REMOVE_FROM_CART} from '../Action/addToCart';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'INCREASE_COUNTER':
    //   return {counter: state.counter + 1};
    case 'ADD_TO_CART':
      return {...state, cartItems: action.payload};

    case 'REMOVE_FROM_CART':
      return cartItems.filter(cartItem => cartItem.key !== action.payload.key);
  }
  return state;
};

export default cartReducer;
