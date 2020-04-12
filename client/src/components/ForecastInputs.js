import React, { useState } from 'react';
import { lineItemTitles } from '../constants/index'


export const ForecastInputs = (props) => {
  //need to make amout of years in forecast dynamic
  const [ forecasts, setForecasts ] = useState({
    FY1: '',
    FY2: '',
    FY3: '', 
    FY4: '',
    FY5: ''
  })

  const handleChange = (e) => {
    setForecasts({
      ...forecasts,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let projection = Object.values(forecasts).map(el => Number(el))
    
    props.forecastUpdate({
      [props.lineItem] : projection
    })
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
