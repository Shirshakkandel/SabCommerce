import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/action/userAction'
import Processing from '../../Components/Common/Processing'
import styled from 'styled-components/macro'

const LoginButton = styled.div`
  background-color: #cc8125;
  display: inline-block;

  .animation-text {
    z-index: 2;
    display: block;
  }
  .animation-bg {
    background-color: #e69f48;
    z-index: 1;
    width: 100%;
    transition: 0.3s ease;
  }
  :hover > .animation-bg {
    height: 100%;
  }
`

export default function Login({ history, location }) {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error, loading } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const [data, setData] = useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      // login: '',
    },
  })

  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property, value)
    setData({ ...data, [property]: value })
  }

  const handleErrors = (property, value) => {
    const { errors } = data
    value = value === undefined ? data[property] : value
    let result
    if (value.trim() === '' && property !== 'password') {
      errors[property] = `${property[0].toUpperCase()}${property.slice(
        1,
        property.length
      )} cannot be left empty`
    } else {
      if (property === 'email') {
        if (!value.match(/^\w+@\w+\.\w+(\.\w+)?$/gi)) {
          errors.email = 'Invalid email'
          result = false
        } else {
          errors.email = ''
          result = true
        }
      } else {
        if (value.length < 8) {
          errors.password = 'Password must be atleat 8 characters'
          result = false
        } else {
          errors.password = ''
          result = true
        }
        setData({ ...data, errors })
      }
    }
    return result
  }

  const loginSubmitHandler = async (event) => {
    event.preventDefault()
    if (!loading) {
      const { email, password } = data
      const credentials = ['email', 'password']
      let goAhead = true

      for (let i = 0; i < credentials.length; i++) {
        const result = handleErrors(credentials[i])
        console.log(handleErrors(credentials[i]))
        if (goAhead !== false) {
          goAhead = result
        }
      }
      if (goAhead) {
        dispatch(login(email, password))
      }
    }
  }
  const {
    email,
    password,
    errors: { email: emailError, password: passwordError },
  } = data

  return (
    <div className="mx-auto my-10 bg-white w-11/12 lg:w-1/2 md:w-full box-border px-10 py-5 shadow-2xl">
      <h2 className="text-center text-lg text-gray-600 font-bold">Login Form</h2>
      {/* Form */}
      <form onSubmit={loginSubmitHandler} className="flex flex-col space-y-4">
        {/* Email */}

        <div className="email space-y-1">
          <label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            className="input-style"
            onChange={(e) => handleChange(e, 'email')}
            placeholder="Enter your email"
          />
          {emailError && <div className="error text-red-600">{emailError}</div>}
        </div>

        {/* Password */}
        <div className="passoword space-y-1">
          <label htmlFor="password">
            Password<span className="text-red-600">* </span>
          </label>
          <input
            type="password"
            className="input-style"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => handleChange(e, 'password')}
            id="password"
          />
          {passwordError && <div className="error text-red-600">{passwordError}</div>}
          {error && <div className="error text-red-600">{error}</div>}
          <p className="text-sm text-blue-500 pl-1">Forget password ?</p>
        </div>
        {/* <button
          type="submit"
          className="bg-yellow-500 mx-auto py-2.5 px-4 text-sm focus:outline-none text-primary "
        >
          Sign In
        </button> */}

        <LoginButton className="button-animation relative w-44 mx-auto text-white overflow-hidden">
          <button className="animation-text relative mx-auto  text-center px-2.5 py-2 focus:outline-none">
            <div className="flex justify-center space-x-2 items-center">
              <div className="flex space-x-2 justify-center items-center">
                <div>Login</div>
                {loading && <Processing />}
              </div>
            </div>
          </button>
          <div className="animation-bg absolute bottom-0 h-0 "></div>
        </LoginButton>

        <p className="text-sm text-center">
          Donot have an account ?{' '}
          <Link to="/register" className="underline">
            Register now
          </Link>
        </p>
      </form>
    </div>
  )
}
