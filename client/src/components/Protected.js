import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { setCredentials } from '../actions/setCredentials'

const Protected = (props) => {
  const history = useHistory()

  useEffect(() => {
    props.setCredentials()
      .catch(err => {
        history.push("/")
      })
  }, [])

  return (
    props.authenticated ?
      <div>
        { props.children }
      </div> :
      null
  )
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.credentials.authenticated
  }
}



export default connect(mapStateToProps, { setCredentials })( Protected )
