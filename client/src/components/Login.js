import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export const Login = (props) => {
  const [ isRegistration, setIsRegistration ] = useState(false)
  const [ user, setUser ] = useState({
    username: '',
    password: '',
    confirm: ''
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const changeForm = (e) => {
    e.target.id === "login" ? 
    setIsRegistration(false) :
    setIsRegistration(true)
  }

  return (
    <div className="bg-gray-300 h-screen">
      <form onSubmit={handleSubmit} className="border border-blue-800 rounded-lg overflow-hidden w-1/3 mx-auto login-position">
        <h1 className="text-3xl font-bold text-white p-4 bg-blue-800 tracking-wide bg-white">{isRegistration ? "Register" : "Login"}</h1>

        <div className="p-4 bg-white">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} value={user.username} className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>        
          
          <input type="text" name="password" placeholder="Password" onChange={handleChange} value={user.password} className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>
          
          {isRegistration &&
              <input type="text" name="confirm" placeholder="Confirm Password" onChange={handleChange} value={user.confirm} className="block p-3 text-xl w-4/5 my-3 rounded-lg mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>
          }

          <button type="submit" className="w-1/5 my-3 border-blue-600 border rounded-lg bg-blue-600 text-white text-xl font-bold py-3 mx-auto block shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">{isRegistration ? "Register" : "Login"}</button>
          <div>
            <button onClick={changeForm} id="registration" className="w-1/4 p-3 border">Register</button>
            <button onClick={changeForm} id="login" className="w-1/4 p-3 border">Login</button>
          </div>
        </div>
      </form>
    </div>
  )
}
