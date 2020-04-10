import React, { useState } from 'react';
import { lineItemTitles } from '../constants/index'


export const ForecastForm = (props) => {
  console.log(props)
  const [ formValues, setFormValues ] = useState({
    FY1: '',
    FY2: '',
    FY3: '', 
    FY4: '',
    FY5: ''
  })

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })

    console.log(formValues)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <h3>{lineItemTitles[props.lineItem]}</h3>
      <form onSubmit={handleSubmit}>
        {Object.keys(formValues).map(el =>
          <div>  
            <label htmlFor={el}>{el}</label>
            <input type="number" onChange={handleChange} id={el} name={el} value={formValues[el]} key={el} />
          </div>
        )}
        <button type="submit">Submit Forecasts</button>
      </form>
    </>
  )
}
