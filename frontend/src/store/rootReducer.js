import { combineReducers } from "redux";
import { productListReducer } from "./reducer/productReducer";
import { userLoginReducer, userRegisterReducer } from "./reducer/userReducer";
const reducer = combineReducers({
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     productList:productListReducer,
     
})
export default reducer
