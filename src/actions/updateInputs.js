import { axiosInstance } from '../utils/axiosInstance'

export const UPDATE_FORECAST = 'UPDATE_FORECAST'
export const UPDATE_GEN_INPUTS = 'UPDATE_GEN_INPUTS'
export const UPDATE_VAL_ASSUMPS =  'UPDATE_VAL_ASSUMPS'
export const UPDATE_ALL = 'UPDATE_ALL'
export const RESET_STATE = 'RESET_STATE'
export const SET_ID = 'SET_ID'


export const updateForecasts = (forecasts) => dispatch => {
  dispatch({type: UPDATE_FORECAST, payload: forecasts})
}

export const resetState = () => dispatch => {
  dispatch({type: RESET_STATE})
}

export const updateGenInputs = (inputs) => dispatch => {
  dispatch({type: UPDATE_GEN_INPUTS, payload: inputs})
}

export const updateValAssumps = (inputs) => dispatch => {
  dispatch({type: UPDATE_VAL_ASSUMPS, payload: inputs})
} 

export const updateAll = (inputs) => dispatch => {
  dispatch({type: UPDATE_ALL, payload: inputs})
}

export const updateID = (inputs) => dispatch => {
  dispatch({type: SET_ID, payload: inputs})
} 


export function submitModel(inputs, modelId, idToken){

  return function(dispatch){
    if (modelId === "new"){
      return (
        postModel(inputs, idToken)
          .then(res => {
            console.log(res)
            dispatch({ type: UPDATE_ALL, payload: res.data })
          })
      )
    }

    return (
      putModel(inputs, modelId, idToken)
        .then(res => {
          dispatch({ type: UPDATE_ALL, payload: res.data })
        })
    )
  }
}


function postModel(inputs, idToken){
  return  axiosInstance(idToken)
            .post('/api/dcf', inputs)    
}

function putModel(inputs, modelId, idToken){
  return axiosInstance(idToken)
          .put(`/api/dcf/${modelId}`, inputs)
}