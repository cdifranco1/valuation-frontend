import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { InputWithLabel } from './InputWithLabel'
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'


const ValInputs = (props) => {
  const history = useHistory()
  const location = useLocation()
  console.log(history)
  console.log(location)
  const { path, url, params: { modelId } } = useRouteMatch()
  const [ valAssumps, setValAssumps] = useState({
    taxRate: '',
    wacc: '',
    ltgr: ''
  })

  useEffect(() => {
    setValAssumps(props.valAssumps)
  }, [props.valAssumps])
  
  const handleChange = (e) => {
    setValAssumps({
      ...valAssumps,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    props.updateValAssumps(valAssumps)

    history.push(`/model/${modelId}/dcf`)
  }

  return (
    <div className="w-2/3 mx-auto flex flex-col">
      <div className="border border-blue-800 bg-gray-300">
        <h3 className="text-2xl text-white py-3 px-2 bg-blue-800 tracking-wide">
          Valuation Assumptions
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col bg-white">

          <InputWithLabel 
            changeHandler={handleChange}
            value={valAssumps.taxRate}
            id="taxRate"
            name="taxRate"
            inputType="number"
            inputWidth='w-1/3'
            labelWidth='w-2/3'
            labelText="Tax Rate (%):"
          />
            
          <InputWithLabel 
            changeHandler={handleChange}
            value={valAssumps.wacc}
            id="wacc"
            name="wacc"
            inputType="number"
            inputWidth='w-1/3'
            labelWidth='w-2/3'
            labelText="WACC (%):"
          />
    
          <InputWithLabel 
            changeHandler={handleChange}
            value={valAssumps.ltgr}
            id="ltgr"
            name="ltgr"
            inputType="number"
            inputWidth='w-1/3'
            labelWidth='w-2/3'
            labelText="Long-Term Growth Rate (%):"
          />  
            
        </form>
      </div>

      <button type="button" onClick={handleSubmit} className="p-4 w-full mt-3 bg-white text-blue-800 hover:bg-blue-700 hover:text-white border border-blue-800 text-xl">{modelId === "new" ? "Forecasts" : "Save Assumptions"}</button>
    </div>
  )
}


const mapStateToProps = (state) => {
  const { valAssumps } = state

  return {
    valAssumps
  }
}


const { updateValAssumps } = actions


export default connect( mapStateToProps, { updateValAssumps } )( ValInputs )
