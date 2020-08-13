import { SET_CREDENTIALS, SET_LOGGED_OUT } from "../actions/setCredentials"

const initialState = {
  idToken: {},
  authenticated: false
}

export const credReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        idToken: action.payload,
        authenticated: true
      }
    case SET_LOGGED_OUT:
      return {
        ...state,
        idToken: {},
        authenticated: false
      }
    default:
      return state
  }
}