import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actionTypes'
export { addToCart, removeFromCart }

const addToCart = (qty, item) => (dispatch, getState) => {
  const { _id, name, image, price, countInStock } = item
  dispatch({ type: CART_ADD_ITEM, payload: { _id, name, image, price, countInStock, qty } })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
