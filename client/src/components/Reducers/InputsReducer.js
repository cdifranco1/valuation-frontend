export const actions = {
  updateForecast: 'UPDATE_FORECAST',
  updateGenInputs: 'UPDATE_GEN_INPUTS',
  updateValAssumps: 'UPDATE_VAL_ASSUMPS'
}

export const initialState = {
  forecasts:{
    revenues: [],
    cogs: [],
    opex: [],
    depreciation: [],
    amortization: [],
    nwcChange: [],
    capex: []
  },
  genInputs: {
    valDate: '2019-10-01',
    fye: '2019-12-31',
    periods: 10,
  },
  valAssumps: {
    wacc: 12,
    taxRate: 25,
    ltgr: 3
  }
}

export const inputsReducer = (state, action) => {
  switch(action.type){
    case actions.updateForecast:
      return {
        ...state, 
        forecasts: {
          ...state.forecasts,
          ...action.payload
        }
      }
    case actions.updateGenInputs:
      return {
        ...state, 
        genInputs: {
          ...state.genInputs,
          ...action.payload
        }
      }
    case actions.updateValAssumps:
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
    default:
      return state
  }
}