import React, { useState, useReducer } from 'react';
import { modelReducer, initialState, actions } from './ForecastsReducer'


export const GeneralInputs = (props) => {
  const [ state, dispatch ] = useReducer(modelReducer, initialState)
  const [ genInputs, setGenInputs] = useState(initialState.genInputs)

  const handleChange = (e) => {
    setGenInputs({
      ...genInputs,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({type: actions.updateGenInputs, payload: genInputs})
    console.log(state)
  }

  return (
    <>
      <h3>General Inputs</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor="valDate">Valuation Date: </label>
          <input type="date" onChange={handleChange} id="valDate" name="valDate" value={genInputs.valDate} />
          
          <label htmlFor="fye">Fiscal Year End: </label>
          <input type="date" onChange={handleChange} id="fye" name="fye" value={genInputs.fye} />
          
          <label htmlFor="taxRate">Tax Rate: </label>
          <input type="number" onChange={handleChange} id="taxRate" name="taxRate" value={genInputs.taxRate} />

          <button type="submit">Save Assumptions</button>
      </form>
    </>
  )
}
