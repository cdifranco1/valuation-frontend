const initialState = {
  display: {
    compSelector: true,
    WACC: false
  },
  comps: []
}

export const WACCReducer = (state=initialState, action) => {
  switch(action.type){
    case "DISPLAY_COMP_SELECTOR":
      return {
        ...state,
        display: {
          WACC: false,
          compSelector: true
        }
      }
    case "DISPLAY_WACC":
      return {
        ...state,
        display: {
          WACC: true,
          compSelector: false
        }
      }
    case "ADD_COMP":
      console.log(action.payload.ticker)
      const newComp = {
        ticker: action.payload.ticker,
        data: action.payload.data
      }
      if (state.comps.findIndex(el => el.ticker === newComp.ticker) === -1) {
        return {
          ...state,
          comps: [...state.comps, newComp]
        }
      }
      return state
    case "DELETE_COMP":
      return {
        ...state,
        comps: state.comps.filter(el => el.ticker !== action.payload)
      }
    default:
      return state
  }
}