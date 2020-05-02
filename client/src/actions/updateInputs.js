import axios from 'axios'

export const UPDATE_FORECAST = 'UPDATE_FORECAST'
export const UPDATE_GEN_INPUTS = 'UPDATE_GEN_INPUTS'
export const UPDATE_VAL_ASSUMPS =  'UPDATE_VAL_ASSUMPS'
export const SET_ID = 'SET_ID'


export const updateForecast = (forecasts) => dispatch => {
  dispatch({type: UPDATE_FORECAST, payload: forecasts})
}

export const updateGenInputs = (inputs) => dispatch => {
  dispatch({type: UPDATE_GEN_INPUTS, payload: inputs})
}

export const updateValAssumps = (inputs) => dispatch => {
  dispatch({type: UPDATE_VAL_ASSUMPS, payload: inputs})
}

//can maybe just use the token instead of 
export const setUserID = (inputs) => dispatch => {
  dispatch({type: UPDATE_VAL_ASSUMPS, payload: inputs})
}



