import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/action/userAction'

export default function Login({ history, location }) {
  const dispatch = useDispatch()
  const [result, setResult] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin
  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo])

  const [data, setData] = useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      // login: '',
    },
  })

  const {
    email,
    password,
    errors: { email: emailError, password: passwordError },
  } = data
  const { errors } = data

  const handleErrors = (property, value) => {
    const { errors } = data
    if (value.trim() === '') {
      errors[property] = `${property[0].toUpperCase()}${property.slice(
        1,
        property.length
      )} cannot be left empty`
    } else {
      if (property === 'email') {
        if (!value.match(/^\w+@\w+\.\w+(\.\w+)?$/gi)) {
          errors.email = 'Invalid email'
        } else {
          errors.email = ''
          setResult(true)
        }
      } else {
        if (value.length < 8) {
          errors.password = 'Password must be atleat 8 characters'
          setResult(false)
        } else {
          errors.password = ''
          setResult(true)
        }
        setData({ ...data, errors })
      }
    }
  }

  function handleEmptyCheck() {
    if (email.trim() === '') {
      errors.email = 'Email cannot be left empty'
    }
    if (password.trim() === '') {
      errors.password = 'Password field cannot be left empty'
      setData({ ...data, errors })
    }
  }

  const handleChange = ({ target: { value } }, property) => {
    handleErrors(property, value)
    setData({ ...data, [property]: value })
  }

  const loginSubmitHandler = async (event) => {
    handleEmptyCheck()
    event.preventDefault()

    if (result) {
      dispatch(login(email, password))
      //Call login to backend
      // try {
      //   setLoginLoading(true)
      //   const { data } = await axios.post(
      //     '/api/users/login',
      //     {
      //       email,
      //       password,
      //     },
      //     { headers: { 'Content-Type': 'application/json' } }
      //   )
      //   if (data) {
      //     setLoginLoading(false)
      //     localStorage.setItem('userInfo', JSON.stringify(data))
      //   }
      // } catch (error) {
      //   setLoginLoading(false)
      //   // errors.login = `${error.response.data.message}`
      //   setLoginError(`${error.response.data.message}`)
      //   console.log(loginError)
      // }
    }
  }

  return (
    <div className="mx-auto my-10 bg-white w-11/12 lg:w-1/2 md:w-full box-border px-10 py-5 shadow-2xl">
      <h2 className="text-center text-lg text-gray-600 font-bold">
        Login Form
      </h2>
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
          {passwordError && (
            <div className="error text-red-600">{passwordError}</div>
          )}
          {error && <div className="error text-red-600">{error}</div>}
          <p className="text-sm text-blue-500 pl-1">Forget password ?</p>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 mx-auto py-2.5 px-4 text-sm focus:outline-none text-primary "
        >
          Sign In
        </button>
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
