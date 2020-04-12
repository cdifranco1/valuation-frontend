import React, { useState, useReducer } from 'react';
import { modelReducer, initialState, actions } from './ForecastsReducer'


export const GeneralInputs = (props) => {
  const [ state, dispatch ] = useReducer(modelReducer, initialState)
  const [ valAssumps, setValAssumps] = useState(initialState.valAssumps)

  const handleChange = (e) => {
    setValAssumps({
      ...valAssumps,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({type: actions.updateValAssumps, payload: genInputs})
    console.log(state)
  }

  return (
    <>
      <h3>Valuation Assumptions</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor="taxRate">Tax Rate: </label>
          <input type="number" onChange={handleChange} id="taxRate" name="taxRate" value={valAssumps.taxRate} />

          <label htmlFor="wacc">WACC: </label>
          <input type="number" onChange={handleChange} id="wacc" name="wacc" value={valAssumps.wacc} />
          
          <label htmlFor="ltgr">Tax Rate: </label>
          <input type="number" onChange={handleChange} id="ltgr" name="ltgr" value={valAssumps.ltgr} />
          
          <button type="submit">Save Assumptions</button>
      </form>
    </>
  )
}
