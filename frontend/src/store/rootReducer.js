import { combineReducers } from 'redux'
import { cartReducer } from './reducer/cartReducer'
import { orderCreateReducer } from './reducer/orderReducer'
import { productDetailsReducer, productListReducer } from './reducer/productReducer'
import { userLoginReducer, userRegisterReducer } from './reducer/userReducer'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
})
export default reducer
