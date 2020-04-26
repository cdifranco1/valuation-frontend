import React, { useState, useEffect } from 'react';
import { lineItemTitles } from '../../../constants'
import { actions } from '../../Reducers/InputsReducer'


export const ForecastInputs = (props) => {
  //need to make amout of years in forecast dynamic
  const [ inputs, setInputs ] = useState({})
  const [ zoom, setZoom ] = useState(false)

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

  const toggleZoom = () => {
    setZoom(!zoom)
  }

  return (
    <div className={`mb-4 p-3 bg-blue-400 rounded-lg shadow-xl transition-transform duration-200 ease-in-out transform ${zoom && '-translate-x-full'}`}>
      <p className="font-semibold text-xl py-3 text-white">{lineItemTitles[props.lineItem]}</p>
      <form onSubmit={handleSubmit} className="flex max-w-full mb-3 justify-between items-center p-3 rounded-lg">
        {Object.keys(inputs).map((el, index) =>
          <div key={el + index} className={`w-1/${Number(props.periods) + 1} p-2`}> 
            <label htmlFor={el} className="w-full text-xl text-center block font-semibold py-2 text-white">{el}</label>
            <input type="number" onChange={handleChange} id={el} name={el} value={inputs[el]} placeholder=" 1,000.00" className="border w-full rounded-lg py-2 bg-gray-300 focus:outline-none focus:shadow-outline focus:bg-white "/>
          </div>
        )}
        <div className="w-1/10 flex justify-center">
          <button type="submit" className="shadow-lg w-1/2 h-10 bg-blue-600 rounded-lg text-white text-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline">Save</button>
        </div>
      </form>
    </div>
  )
}
