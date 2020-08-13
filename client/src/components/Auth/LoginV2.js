import React, { useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function Login(){
  const history = useHistory()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then(() => history.push("/dashboard"))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
    </div>
  )
}

export default withAuthenticator(Login)