import React, { useState, useEffect } from 'react';
import { actions } from '../../reducers/InputsReducer'


export const ValInputs = (props) => {
  const [ valAssumps, setvalAssumps] = useState({
    taxRate: '',
    wacc: '',
    ltgr: ''
  })

  useEffect(() => {
    setvalAssumps(props.inputs.valAssumps)
  }, [props.inputs.valAssumps])
  
  const handleChange = (e) => {
    setvalAssumps({
      ...valAssumps,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    props.updateInputs(actions.updateValAssumps, valAssumps)
  }

  return (
    <>
      <h3>Valuation Assumptions</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor="taxRate">Tax Rate (%): </label>
          <input type="number" onChange={handleChange} id="taxRate" name="taxRate" value={valAssumps.taxRate} />

          <label htmlFor="wacc">WACC (%): </label>
          <input type="number" onChange={handleChange} id="wacc" name="wacc" value={valAssumps.wacc} />
          
          <label htmlFor="ltgr">Long-Term Growth Rate (%): </label>
          <input type="number" onChange={handleChange} id="ltgr" name="ltgr" value={valAssumps.ltgr} />
          
          <button type="submit">Save Assumptions</button>
      </form>
    </>
  )
}
