import React from 'react';
import { NavLink, Route } from 'react-router-dom'


export const Nav = () => {
  return (
    <div className="bg-blue-800 text-white flex justify-end">
      <NavLink className="p-6 text-2xl" to="/login" activeClassName="selected">Login</NavLink>
      <NavLink className="p-6 text-2xl" to="/DCF" activeClassName="selected">Discounted Cash Flow</NavLink>
    </div>
  )
}