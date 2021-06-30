import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../actionTypes'
export { addToCart, removeFromCart, saveShippingAddress }

const addToCart = (qty, item) => (dispatch, getState) => {
  const { _id, name, image, price } = item
  dispatch({ type: CART_ADD_ITEM, payload: { product: _id, name, image, price, qty } })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
