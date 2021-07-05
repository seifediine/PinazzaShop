import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // Add the item to the cart
    case CART_ADD_ITEM:
      const item = action.payload

      // Check if the item is already added to the cart
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        // if exists don't add it to the cart
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }
        // If not existing, add it to the cart
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    default:
      return state
  }
}
