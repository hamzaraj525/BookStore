import React from 'react';

export const ADD_TO_CART = 'ADD_TO CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = payload => {
  return {
    type: 'ADD_TO_CART',
    payload: payload,
  };
};

export const removeToCart = payload => {
  return {
    type: 'REMOVE_TO_CART',
    payload: payload,
  };
};
