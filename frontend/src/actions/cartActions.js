// The reason we're bringing in Axios is because when we add an item to the cart, we want to make a request to "/api/products" and then the "id" to get the data for that particular product to add to our cart
import axios from 'axios'

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

// We gonna use "thunk", so we want to do async and pass in our dispatch
// We're also going to be saving our entire cart to local storage, so along with dispatch we'll pass "getState" and that allows us to get our entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // Making request
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  // Once we dispatch, we want to save it in local storage, so we can use our local storage API.

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  // We wrap "getState" with JSON.stringify because we can only save strings in local storage
  // Then once we take it out, we'll have to use JSON.parse to parse it back to javascript
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
