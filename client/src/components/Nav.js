import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { setLogout } from "../actions/setCredentials"


const Nav = ({ authenticated, setLogout }) => {
  const history = useHistory()

  const logout = async () => {
    try {
      await Auth.signOut()
      setLogout()
      history.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-blue-800 text-white flex justify-end sticky top-0">
      {authenticated ? 
        <button onClick={logout} className="p-6 text-xl">Logout</button>
      :
        <NavLink className="p-6 text-xl" exact to="/" activeClassName="selected">Login</NavLink>
      }
      <NavLink className="p-6 text-xl" to="/dashboard" activeClassName="selected">Dashboard</NavLink>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.credentials.authenticated
  }
}

export default connect(mapStateToProps, { setLogout })( Nav )