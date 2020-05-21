import React, { Component, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import * as OktaSignIn from '@okta/okta-signin-widget';
import Logo from '../../assets/images/Logo3.png'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import config from "../../config"


const SignInWidget = () => {
  const history = useHistory()
  console.log("mounting")

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
      console.log(widget)
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

