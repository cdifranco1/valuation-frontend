import React, { useState, Component, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';


const Login = ({ baseUrl }) => {
  const { authState, authService } = useOktaAuth()
  console.log(authState)
  console.log(authService)

  // const checkAuthentication = async () => {
  //   const authStatus = await auth.isAuthenticated()
    
  //   if (authStatus !== authenticated){
  //     setAuthenticated(authStatus)
  //   }
  // }

  const onSuccess = (res) => {

    if (res.status === 'SUCCESS') {
      return authService.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  const onError = (err) => {
    console.log('error logging in', err);
  }
  

  return (
      authState.isAuthenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <OktaSignInWidget
        baseUrl={baseUrl}
        onSuccess={onSuccess}
        onError={onError}/>
  )
}

export default Login



// export default withOktaAuth(class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.onSuccess = this.onSuccess.bind(this);
//     this.onError = this.onError.bind(this);
//     this.state = {
//       authenticated: null
//     };
//     this.checkAuthentication();
//   }

//   async checkAuthentication() {
//     const authenticated = await this.props.auth.isAuthenticated();
//     if (authenticated !== this.state.authenticated) {
//       this.setState({ authenticated });
//     }
//   }

//   componentDidUpdate() {
//     this.checkAuthentication();
//   }

//   onSuccess(res) {
//     if (res.status === 'SUCCESS') {
//       return this.props.auth.redirect({
//         sessionToken: res.session.token
//       });
//    } else {
//     // The user can be in another authentication state that requires further action.
//     // For more information about these states, see:
//     //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
//     }
//   }

//   onError(err) {
//     console.log('error logging in', err);
//   }

//   render() {
//     if (this.state.authenticated === null) return null;
//     return this.state.authenticated ?
//       <Redirect to={{ pathname: '/' }}/> :
//       <OktaSignInWidget
//         baseUrl={this.props.baseUrl}
//         onSuccess={this.onSuccess}
//         onError={this.onError}/>;
//   }
// });