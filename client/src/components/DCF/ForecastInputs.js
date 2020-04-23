import React, { useState, useEffect, useLayoutEffect } from 'react';
import { lineItemTitles } from '../../constants/index'
import { actions } from '../Reducers/InputsReducer'


export const ForecastInputs = (props) => {
  //need to make amout of years in forecast dynamic
  const [ inputs, setInputs ] = useState({})

  useEffect(() => {
    const inputsObj = {}
    for (let i = 0; i < props.periods; i++){
      inputsObj[`FY${i + 1}`] = props.forecasts[props.lineItem][i] || ''
    }
    setInputs(inputsObj)
  }, [ props.periods, props.lineItem, props.forecasts])

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
      [props.lineItem] : projections
    }

    props.updateInputs(actions.updateForecast, payload)
  }

  return (
    <>
      <p>{lineItemTitles[props.lineItem]}</p>
      <form onSubmit={handleSubmit} className="flex max-w-full mb-3">
        {Object.keys(inputs).map((el, index) =>
          <div key={index} className={`flex-col w-1/${props.periods + 1} mr-3`}> 
            <label htmlFor={el}>{el}</label>
            <input type="number" onChange={handleChange} id={el} name={el} value={inputs[el]} className="border max-w-full"/>
          </div>
        )}
        <button type="submit" className={`border border-grey w-1/${props.periods + 1} `}>Save</button>
      </form>
    </>
  )
}
