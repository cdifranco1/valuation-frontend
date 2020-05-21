import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from "../../config"


const SignInWidget = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes, baseUrl } = config.oidc

    const widget = new OktaSignIn({
      baseUrl,
      clientId,
      redirectUri,
      authParams: {
        scopes,
        pkce,
        issuer
      }
    })

    widget.renderEl(
      {el: '#sign-in-widget'},
      () => {

      },
      (err) => {
        throw err
      }
    )
  }, [])

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  )
}

export default SignInWidget

// export default class OktaSignInWidget extends Component {
//   componentDidMount() {
//     console.log(this.props)
//     const el = ReactDOM.findDOMNode(this);
//     this.widget = new OktaSignIn({
//       baseUrl: this.props.baseUrl,
//       authParams: {
//         pkce: true
//       }
//     });
//     this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
//   }

//   componentWillUnmount() {
//     this.widget.remove();
//   }

//   render() {
//     return <div />;
//   }
// };

