export const actions = {
  updateForecast: 'UPDATE_FORECAST',
  updateGenInputs: 'UPDATE_GEN_INPUTS',
  updateValAssumps: 'UPDATE_VAL_ASSUMPS'
}

export const initialState = {
  forecasts:{
    revenues: [100, 200, 300, 400, 500],
    cogs: [60, 150, 200, 300, 350],
    opex: [50, 50, 50 , 50, 50],
    nwcChange: [20, 35, 40, 45, 50],
    capex: [10, 10, 10, 10, 10]
  },
  genInputs: {
    valDate: '2019-10-01',
    fye: '2019-12-31',
  },
  valAssumps: {
    wacc: .12,
    taxRate: .25,
    ltgr: .03
  }
}


function convertToDec(num){
  return num/100
}

export const modelReducer = (state, action) => {
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
        wacc: convertToDec(action.payload.wacc),
        taxRate: convertToDec(action.payload.taxRate),
        ltgr: convertToDec(action.payload.ltgr)
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