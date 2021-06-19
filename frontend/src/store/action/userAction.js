import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionTypes"

const login = (email, password) => async (dispatch) => {
     try {
          dispatch({ type: LOGIN_REQUEST })
          const { data } = await axios.post('/api/users/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })
          if (data) {
          dispatch({ type: LOGIN_SUCCESS, payload: data })
          localStorage.setItem('userInfo', JSON.stringify(data))
          }
          
     } catch (error) {
          dispatch({
               type: LOGIN_FAIL,
               payload:error.response && error.response.data.message
          ? error.response.data.message : "Please check your internet connection"
          })
     }
}

 const register = (user, number) => async (dispatch) => {
     try {
          dispatch({ type: REGISTER_REQUEST })
          const { data } = await axios.post('/api/users', {...user,number}, { headers: { "Content-Type": "application/json" } })
          dispatch({ type: REGISTER_SUCCESS, payload: data })
          dispatch({ type: LOGIN_SUCCESS, payload: data })
          localStorage.setItem('userInfo', JSON.stringify(data))

     } catch (error) {
          dispatch({type:REGISTER_FAIL, payload:error.response.data.message})
     }
}
export { login, register }