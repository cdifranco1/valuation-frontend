import { axiosInstance } from '../utils/axiosInstance'
import { axiosIEX } from "../utils/axiosInstance"
import * as Cache from '../utils/cache'

export const actionTypes = {
  DISPLAY_COMP_SELECTOR: 'DISPLAY_COMP_SELECTOR',
  DISPLAY_WACC: 'DISPLAY_WACC',
  ADD_COMP: "ADD_COMP",
  DELETE_COMP: "DELETE_COMP"
}

export const updateDisplay = (display) => dispatch => {
  const types = {
    "WACC": actionTypes.DISPLAY_WACC,
    "compSelector": actionTypes.DISPLAY_COMP_SELECTOR
  }

  dispatch({type: types[display]})
}

export const fetchBetaData = (symbol) => dispatch => {
  if (Cache.isCached(symbol)){
    const cachedStats = Cache.getCached(symbol)
    console.log(cachedStats)
    return dispatch({
      type: actionTypes.ADD_COMP, 
      payload: {
        ticker: symbol,
        data: cachedStats
      }
    })
  }

  axiosIEX(symbol, "advanced-stats")
    .get()
    .then(res => {
        Cache.setCache(symbol, res.data)
        dispatch({
          type: actionTypes.ADD_COMP, 
          payload: {
            ticker: symbol,
            data: res.data
          }
        })
    })
}

export const removeComp = (symbol) => (dispatch) => {
  return dispatch({type: actionTypes.DELETE_COMP, payload: symbol})
}

