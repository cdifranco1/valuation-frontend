import { template } from '../constants/index'
export const actions = {
  updateForecasts: 'UPDATE_FORECAST',
  updateGenInputs: 'UPDATE_GEN_INPUTS',
  updateValAssumps:  'UPDATE_VAL_ASSUMPS',
  updateAll:  'UPDATE_ALL',
  updateId: 'SET_ID'
}


export const initialState = template

export const dcfReducer = (state = initialState, action) => {
  switch(action.type){
    case actions.updateAll:
      return {
        ...action.payload
      }
    case actions.updateForecasts:
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
    case actions.updateId:
      return {
        ...state,
        id: action.payload 
      }
    default:
      return state
  }
}




// export const initialState = {
//   id: '',
//   forecasts:{
//     revenues: [],
//     cogs: [],
//     opex: [],
//     depreciation: [],
//     amortization: [],
//     capex: [],
//     nwcChange: []
//   },
//   genInputs: {
//     projectName: '',
//     entityName: '',
//     valDate: '2019-10-01',
//     fye: '2019-12-31',
//     periods: 5,
//   },
//   valAssumps: {
//     wacc: 0,
//     taxRate: 0,
//     ltgr: 0
//   }
// }