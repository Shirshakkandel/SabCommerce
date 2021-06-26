import { CART_ADD_ITEM } from '../actionTypes'

const addToCart = (qty, item) => (dispatch, getState) => {
  const { _id, name, image, price, countInStock } = item
  dispatch({ type: CART_ADD_ITEM, payload: { _id, name, image, price, countInStock, qty } })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export { addToCart }
