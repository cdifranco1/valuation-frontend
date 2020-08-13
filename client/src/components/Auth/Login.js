import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';


const Login = ({ baseUrl }) => {
  const { authState } = useOktaAuth()

  return (
    authState.isPending ?
    <h1>...Loading</h1> :
    authState.isAuthenticated ?
    <Redirect to={{ pathname: '/dashboard' }}/> :
    <OktaSignInWidget
              baseUrl={baseUrl}
            />
  )
}

export default Login

