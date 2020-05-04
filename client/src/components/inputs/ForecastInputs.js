import React, { useState, useEffect } from 'react';
import { lineItemTitles } from '../../constants'
import { Form, Field } from 'react-final-form'

import { actions } from '../../reducers/InputsReducer'


export const ForecastInputs = ({ periods, forecasts, lineItem, updateInputs }) => {
  const [ inputs, setInputs ] = useState()

  const createInputsObj = (periods, forecasts, lineItem) => {
    const inputsObj = {}
    for (let i = 0; i < periods; i++){
      inputsObj[`FY${i + 1}`] = forecasts[lineItem][i] || ''
    }
    return inputsObj
  }

  useEffect(() => {
    const inputsObj = createInputsObj(periods, forecasts, lineItem)
    setInputs(inputsObj)
  }, [ periods, lineItem, forecasts])
  

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const projections = Object.values(inputs).map(el => Number(el))
    const payload = {
      [lineItem] : projections
    }

    updateInputs(actions.updateForecastInputs, payload)
  }

  return (
    inputs ?
    <div className={`mb-4 p-3 bg-blue-400 rounded-lg shadow-xl`}>
      <p className="font-semibold text-xl py-3 text-white">{lineItemTitles[lineItem]}</p>
            <form onSubmit={handleSubmit} className="flex max-w-full mb-3 justify-between items-center p-3 rounded-lg">
              {Object.keys(inputs).map((el, index) =>
                <div key={el + index} className={`w-1/${Number(periods) + 1} p-2`}> 
                  <label htmlFor={el} className="w-full text-xl text-center block font-semibold py-2 text-white">{el}</label>
                  <input
                    type="number"
                    onChange={handleChange}
                    value={inputs[el]}
                    id={el} 
                    name={el} 
                    placeholder=" 1,000.00" 
                    className="border w-full rounded-lg py-2 bg-gray-300 focus:outline-none focus:shadow-outline focus:bg-white "
                    />
                </div>
              )}
              <div className="w-1/10 flex justify-center">
                <button type="submit" className="shadow-lg w-1/2 h-10 bg-blue-600 rounded-lg text-white text-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">Save</button>
              </div>
            </form>
    </div> :
    null
  )
}
