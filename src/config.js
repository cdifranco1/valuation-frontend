const CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID 
const BASE_URL = process.env.REACT_APP_ORG_URL
const ISSUER = `${BASE_URL}/oauth2/default` 

//Do I need this https check??
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

const redirectUri = process.env.NODE_ENV === "production" ? "https://valuation-gamma.vercel.app/implicit/callback" : 'http://localhost:3000/implicit/callback'

export default {
  oidc: {
    baseUrl: BASE_URL,
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
  }
  // don't think I need a resource server specified
  // resourceServer: {
  //   messagesUrl: 'http://localhost:3000/api/messages',
  // },
};