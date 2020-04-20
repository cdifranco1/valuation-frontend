import React, { useState, useEffect, useLayoutEffect } from 'react';
import { lineItemTitles } from '../../constants/index'
import { actions } from '../Reducers/InputsReducer'


export const ForecastInputs = (props) => {
  //need to make amout of years in forecast dynamic
  const [ forecasts, setForecasts ] = useState({
    FY1: '',
    FY2: '',
    FY3: '',
    FY4: '',
    FY5: ''
  })

  useEffect(() => {
    const inputsObj = {}
    for (let i = 0; i < props.periods; i++){
      inputsObj[`FY${i + 1}`] = ''
    }
    setForecasts({...inputsObj})

  }, [props.periods])

  const handleChange = (e) => {
    setForecasts({
      ...forecasts,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const forecast = Object.values(forecasts).map(el => Number(el))
    const payload = {
      [props.lineItem] : forecast
    }

    props.updateInputs(actions.updateForecast, payload)
  }

  return (
    <>
      <h3>{lineItemTitles[props.lineItem]}</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(forecasts).map(el =>
          <div>  
            <label htmlFor={el}>{el}</label>
            <input type="number" onChange={handleChange} id={el} name={el} value={forecasts[el]} key={el} />
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </>
  )
}
