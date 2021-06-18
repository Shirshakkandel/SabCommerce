import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./reducer/userReducer";
const reducer = combineReducers({
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     
})
export default reducer
