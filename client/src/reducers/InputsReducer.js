import { template } from '../constants/index'
import * as actions from '../actions/updateInputs'


export const initialState = template

export const dcfReducer = (state = initialState, action) => {
  switch(action.type){
    case actions.UPDATE_ALL:
      return {
        ...action.payload
      }
    case actions.UPDATE_FORECAST:
      return {
        ...state, 
        forecasts: {
          ...state.forecasts,
          ...action.payload
        }
      }
    case actions.UPDATE_GEN_INPUTS:
      return {
        ...state, 
        genInputs: {
          ...state.genInputs,
          ...action.payload
        }
      }
    case actions.UPDATE_VAL_ASSUMPS:
      const assumps = {
        wacc: action.payload.wacc,
        taxRate: action.payload.taxRate,
        ltgr: action.payload.ltgr
      }
      return {
        ...state, 
        valAssumps: {
          ...state.valAssumps,
          ...assumps
        }
      }
    case actions.SET_ID:
      return {
        ...state,
        id: action.payload 
      }
    case actions.RESET_STATE:
      return {
        ...initialState 
      }
    default:
      return state
  }
}
