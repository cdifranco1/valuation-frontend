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
    wc: [],
    capex: []
  },
  genInputs: {
    valDate: '',
    fye: '',
  },
  valAssumps: {
    WACC: 0,
    taxRate: 0,
    LTGR: 0
  }
}


export const modelReducer = (state, action) => {
  switch(action.type){
    case actions.updateForecast:
      console.log(action.payload)
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
      return {
        ...state, 
        valAssumps: {
          ...state.valAssumps,
          ...action.payload
        }
      }
    default:
      return state
  }
}