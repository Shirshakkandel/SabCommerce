import { combineReducers } from "redux";
import { cartReducer } from "./reducer/cartReducer";
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import { userLoginReducer, userRegisterReducer } from "./reducer/userReducer";
const reducer = combineReducers({
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart:cartReducer,
})
export default reducer
