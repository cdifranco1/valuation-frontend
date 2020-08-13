import {Auth} from "aws-amplify"

export const SET_CREDENTIALS = "SET_CREDENTIALS"
export const SET_LOGGED_OUT = "LOGOUT"

export const setCredentials = dispatch => async (dispatch) => {
    const { signInUserSession: { idToken: { jwtToken }}} = await Auth.currentAuthenticatedUser()

    dispatch({ type: SET_CREDENTIALS, payload: jwtToken})
}

export const setLogout = dispatch => async (dispatch) => {
    dispatch({ type: SET_LOGGED_OUT })
}

