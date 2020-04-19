import React, { useState } from 'react';
import { actions } from './ForecastsReducer'


export const GeneralInputs = (props) => {
  const [ genInputs, setGenInputs] = useState({
    valDate: '',
    fye: '',
    periods: ''
  })

  const handleChange = (e) => {
    setGenInputs({
      ...genInputs,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    props.updateState(actions.updateGenInputs, genInputs)
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
