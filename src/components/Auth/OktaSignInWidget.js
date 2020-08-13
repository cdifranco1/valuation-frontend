import React, { useEffect } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import Logo from '../../assets/images/Logo3.png'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from "../../config"


const SignInWidget = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes, baseUrl } = config.oidc

    const widget = new OktaSignIn({
      baseUrl,
      clientId,
      redirectUri,
      logo: Logo,
      authParams: {
        scopes,
        pkce,
        issuer
      },
      features: {
        registration: true,
      }
    })

    widget.renderEl(
      {el: '#sign-in-widget'},
      function success(res){
      },
      (err) => {
        throw err
      }
    )

    return function cleanup(){
      widget.remove()
    }

  }, [])

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  )
}

export default SignInWidget


