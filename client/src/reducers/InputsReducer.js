import axios from 'axios'

export const UPDATE_FORECAST = 'UPDATE_FORECAST'
export const UPDATE_GEN_INPUTS = 'UPDATE_GEN_INPUTS'
export const UPDATE_VAL_ASSUMPS =  'UPDATE_VAL_ASSUMPS'
export const SET_ID = 'SET_ID'


export const initialState = {
  id: '',
  forecasts:{
    revenues: [],
    cogs: [],
    opex: [],
    depreciation: [],
    amortization: [],
    capex: [],
    nwcChange: []
  },
  genInputs: {
    projectName: '',
    entity: '',
    valDate: '2019-10-01',
    fye: '2019-12-31',
    periods: 5,
  },
  valAssumps: {
    wacc: 0,
    taxRate: 0,
    ltgr: 0
  }
}

export const inputsReducer = (state = initialState, action) => {
  switch(action.type){
    case UPDATE_FORECAST:
      return {
        ...state, 
        forecasts: {
          ...state.forecasts,
          ...action.payload
        }
      }
    case UPDATE_GEN_INPUTS:
      return {
        ...state, 
        genInputs: {
          ...state.genInputs,
          ...action.payload
        }
      }
    case UPDATE_VAL_ASSUMPS:
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
    case SET_ID:
      return {
        ...state,
        id: action.payload 
      }
    default:
      return state
  }
}