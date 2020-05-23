// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';

// const Home = () => {
//   const { authService, authState } = useOktaAuth() 

//   const login = () => {
//     authService.login('/');
//   }

//   const  logout = () => {
//     authService.logout('/');
//   }

  
//   if (authState.isPending) return null;

//   const button = authState.isAuthenticated ?
//     <button onClick={logout}>Logout</button> :
//     <button onClick={login}>Login</button>;

//   return (
//     <div>
//       <Link to='/'>Home</Link><br/>
//       {button}
//     </div>
//   );
// }

// export default Home