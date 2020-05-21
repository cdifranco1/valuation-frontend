const CLIENT_ID = process.env.REACT_APP_CLIENT_ID 
const BASE_URL = process.env.REACT_APP_ORG_URL
const ISSUER = `${BASE_URL}/oauth2/default` 

//Do I need this https check??
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    baseUrl: BASE_URL,
    issuer: ISSUER,
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:3000/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
  }
  // don't think I need a resource server specified
  // resourceServer: {
  //   messagesUrl: 'http://localhost:3000/api/messages',
  // },
};