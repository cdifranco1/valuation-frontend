import React, { useState, useEffect } from 'react'
import { lineItemTitles } from '../../constants'
import  ForecastInputs from './ForecastInputs'
import { forecastInputLineItems } from '../../constants/index'
import { connect } from 'react-redux'


const ForecastInputContainer = ( props ) => {
  const [ forecasts, setForecasts ] = useState({})
  const [ index, setIndex ] = useState(0)

  const forecastKeys = Object.keys(forecasts).filter(el => forecastInputLineItems.includes(el))

  useEffect(() => {
    setForecasts(props.forecasts)
  }, [props.forecasts])

  const nextInput = () => {
    const length = forecastKeys.length
    if (index === length - 1){
      return setIndex(0)
    }
    
    setIndex(index + 1)
  }
  
  const lastInput = () => {
    const length = forecastKeys.length
    if (index === 0){
      return setIndex(length - 1)
    }
    
    setIndex(index - 1)
  }

  return (
    <div className="shadow-2xl">
      <h3 className="p-3 mt-10 bg-blue-700 text-white">Forecast Inputs</h3>
      <div className="p-6 flex justify-between bg-white">
        <div className="flex items-center w-1/12 justify-start">
          <button className="p-2 w-full text-blue-600 border-blue-600 border hover:bg-blue-600 hover:text-white focus:outline-none focus:shadow-outline active:bg-blue-700" onClick={lastInput}>
            {index > 0 ? 
            lineItemTitles[forecastKeys[index - 1]] : 
            lineItemTitles[forecastKeys[forecastKeys.length - 1]]}
          </button>
        </div>
        {Object.keys(forecasts).filter(el => forecastKeys.includes(el)).filter((el, i) => i === index ? el : null).map((el, index) =>
          <ForecastInputs key={index} lineItem={el} />
          )}
        <div className="flex justify-end items-center w-1/12">
          <button className="p-2 w-full text-blue-600 border-blue-600 border hover:bg-blue-600 hover:text-white focus:outline-none focus:shadow-outline active:bg-blue-700" onClick={nextInput}>
            {index < forecastKeys.length - 1 ? 
            lineItemTitles[forecastKeys[index + 1]] : 
            lineItemTitles[forecastKeys[0]]}
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { forecasts } = state.dcf

  return {
    forecasts
  }
}

export default connect( mapStateToProps, null )( ForecastInputContainer )