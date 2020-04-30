import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export const UserForm = (props) => {
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

  return (
    <div className="bg-gray-300 h-screen">
      <form onSubmit={handleSubmit} className="border border-blue-800 rounded-lg overflow-hidden w-1/3 mx-auto login-position shadow-lg">
        <h1 className="text-3xl font-bold text-white p-4 bg-blue-800 tracking-wide bg-white">{props.register ? "Register" : "Login"}</h1>

        <div className="p-4 bg-white">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} value={user.username} className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>        
          
          <input type="text" name="password" placeholder="Password" onChange={handleChange} value={user.password} className="block p-3 text-xl w-4/5 my-3 mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>
          
          {props.register &&
              <input type="text" name="confirm" placeholder="Confirm Password" onChange={handleChange} value={user.confirm} className="block p-3 text-xl w-4/5 my-3 rounded-lg mx-auto rounded-lg focus:bg-white focus:outline-none focus:shadow-outline border-blue-600 border"/>
          }

          <button type="submit" className="w-4/5 my-3 border-blue-600 border rounded-lg bg-blue-600 text-white text-xl font-bold py-3 mx-auto mb-8 block shadow-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">{props.register ? "Register" : "Login"}</button>

          <div className="flex justify-center my-5 w-full">
            <NavLink to="/register" className="w-2/5 block p-3 text-lg text-center text-white bg-blue-400" activeClassName="bg-blue-700" >Register</NavLink>
            <NavLink to="/login" activeClassName="bg-blue-700 " className="w-2/5 block p-3 text-lg text-center text-white bg-blue-400">Login</NavLink>
          </div>
        </div>
      </form>
    </div>
  )
}
