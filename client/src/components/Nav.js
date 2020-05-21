import React from 'react';
import { NavLink, Route } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';


export const Nav = () => {
  const { authService, authState } = useOktaAuth()

  const  logout = () => {
    authService.logout('/');
  }

  return (
    <div className="bg-blue-800 text-white flex justify-end sticky top-0">
      {authState.isAuthenticated ? 
        <button onClick={logout} className="p-6 text-2xl">Logout</button>
      :
        <NavLink className="p-6 text-2xl" exact to="/login" activeClassName="selected">Login</NavLink>
      }
      <NavLink className="p-6 text-2xl" to="/dashboard" activeClassName="selected">Dashboard</NavLink>
    </div>
  )
}