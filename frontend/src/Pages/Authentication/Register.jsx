import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import { register } from '../../store/action/userAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Register({ history }) {
  const [callRegister, setCallRegister] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  // useEffect(() => {
  //   function checkUserData() {
  //     const item = localStorage.getItem('userInfo')
  //       ? JSON.parse(localStorage.getItem('userInfo'))
  //       : null

  //     if (item) {
  //       setUserInfo(item)
  //     }
  //   }
  //   window.addEventListener('storage', checkUserData())
  //   return () => {
  //     window.removeEventListener('storage', checkUserData())
  //   }
  // }, [])

  //Push to Homepage if already login
  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  const [data, setData] = useState({
    userName: '',
    email: '',
    accountType: 'individual',
    phoneNumber: '',
    password: '',
    countryCode: '+977',
    confirmPassword: '',
    errors: {
      userName: '',
      email: '',
      number: '',
      accountType: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [number, setNumber] = useState(data.countryCode + data.phoneNumber)

  const {
    userName,
    email,
    accountType,
    countryCode,
    phoneNumber,
    password,
    confirmPassword,
    errors: {
      userName: userNameErr,
      email: emailErr,
      accountType: accountErr,
      password: passwordErr,
      number: numberErr,
      confirmPassword: confirmPasswordErr,
    },
  } = data
  let { errors } = data

  useEffect(() => {
    const num = countryCode + phoneNumber
    setNumber(num)
  }, [data.countryCode, data.phoneNumber])

  function handleChange({ target: { value } }, property) {
    handleErrors(value, property)
    setData({ ...data, [property]: value })
  }

  function handleErrors(value, property) {
    let result
    if (value.trim() === '') {
      errors[property] = `${property[0].toUpperCase()}${property.slice(
        1,
        property.length
      )} cannot be left empty`
    } else {
      if (property === 'email') {
        if (!value.match(/^\w+@\w+\.\w+(\.\w+)?$/gi)) {
          errors.email = 'Invalid email'
          setCallRegister(false)
        } else {
          errors.email = ''
          setCallRegister(true)
        }
      } else if (property === 'userName') {
        errors.userName = ''
        setCallRegister(true)
      } else if (property === 'password') {
        if (value.length < 8) {
          errors.password = 'Password must be atleast 8 characters long'
          setCallRegister(false)
        } else {
          errors.password = ''
          setCallRegister(true)
        }
      } else if (property === 'confirmPassword') {
        if (value !== data.password) {
          errors.confirmPassword = 'Passwords do not match'
          setCallRegister(false)
        } else {
          errors.confirmPassword = ''
          setCallRegister(true)
        }
      }
    }
    setData({
      ...data,
      errors,
    })
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault()
    if (callRegister) {
      dispatch(register(data, number))
      // try {
      //   const { data } = await axios.post(
      //     '/api/users',
      //     { userName, email, accountType, number, password },
      //     { headers: { 'Content-Type': 'application/json' } }
      //   )
      //   if (data) {
      //     console.log(data)
      //     setRegisterLoading(false)
      //     localStorage.setItem('userInfo', JSON.stringify(data))
      //     setUserInfo(data)
      //   }
      // } catch (error) {
      //   setRegisterLoading(false)
      //   setError(`${error.response.data.message}`)
      // }
    }
  }

  return (
    <div className="w-full py-10">
      <div className="w-11/12 lg:w-1/2 max-w-2xl mx-auto  bg-white shadow-2xl flex flex-col px-10 py-5 font-sans">
        <h2 className="text-secondary text-lg py-5 text-center font-semibold">
          Register
        </h2>
        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col space-y-4 "
        >
          {/* Name */}
          <div className=" space-y-1">
            <div className="label font-medium">
              <label>
                UserName <span className="text-red-600">*</span>
              </label>
            </div>
            <input
              type="text"
              className="input-style"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => handleChange(e, 'userName')}
            />
            {userNameErr && (
              <div className="error text-red-600">{userNameErr}</div>
            )}
          </div>
          {/* Email */}
          <div className="space-y-1">
            <label>
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              className="input-style"
              value={email}
              onChange={(e) => handleChange(e, 'email')}
              placeholder="Enter your email address"
            />
            {emailErr && <div className="error text-red-600">{emailErr}</div>}
          </div>
          {/* Account Type */}
          <div className="space-y-1">
            <div>
              Account Type <span className="text-red-600">*</span>
            </div>
            <div className="relative">
              <select
                className="select-style font-light text-gray-600"
                value={accountType}
                onChange={(e) => handleChange(e, 'accountType')}
              >
                <option disable="true">Select Account Type</option>
                <option value="individual">Individual</option>
                <option value="business">
                  Business(Must be 5 employee and Daily order)
                </option>
              </select>
              <span className="absolute top-2 right-3">
                <ExpandMoreIcon />
              </span>
            </div>
            {accountErr && (
              <div className="error text-red-600">{accountErr}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="space-y-1 flex flex-col">
            <label htmlFor="phone">
              Mobile <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-1 h-full items-center  ">
              <div className="">
                <select
                  name=""
                  id="phone"
                  value={countryCode}
                  onChange={(e) => handleChange(e, 'countryCode')}
                  className="px-2 py-2.5 border  focus:outline-none focus:border-yellow-500 "
                >
                  <option value="+977">+977</option>
                  <option value="+91">+91</option>
                </select>
              </div>
              <input
                className="input-style flex-1"
                type="number"
                value={phoneNumber}
                onChange={(e) => handleChange(e, 'phoneNumber')}
                placeholder="Enter your phone number"
              />
            </div>
            {numberErr && (
              <div className="error block text-red-600">{numberErr}</div>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col space-y-1">
            <label>
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handleChange(e, 'password')}
              className="input-style"
            />
            {passwordErr && (
              <div className="error text-red-600">{passwordErr}</div>
            )}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="">
              Confirm Pasword <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="input-style"
              value={confirmPassword}
              onChange={(e) => handleChange(e, 'confirmPassword')}
            />
            {confirmPasswordErr && (
              <div className="error text-red-600">{confirmPasswordErr}</div>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {/* Submit Button */}
          <div className="w-full flex justify-center items-center ">
            <button className="w-44 bg-yellow-500 text-black px-2.5 py-2 text-base focus:outline-none ">
              Register
            </button>
          </div>

          <div className="text-xs pb-2 text-center">
            Already have an account ?
            <Link
              to="/login"
              className="underline"
              onClick={() => window.scrollTo(0, 0)}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
