import React from 'react';
import { NavLink, Route } from 'react-router-dom'


export const Nav = () => {
  return (
    <div className="bg-blue-800 text-white flex justify-end sticky top-0">
      <NavLink className="p-6 text-2xl" exact to="/login" activeClassName="selected">Login</NavLink>
      <NavLink className="p-6 text-2xl" to="/dashboard" activeClassName="selected">Dashboard</NavLink>
    </div>
  )
}