import React, { useState, useEffect } from 'react'
import moment from 'moment'

export const ForecastYears = ({periods, valDate}) => {
  const [ forecastPeriods, setForecastPeriods ] = useState([])
  const [ forecastYears, setForecastYears ] = useState([])

  useEffect(() => {
    const periodsArr = []
    const yearsArr = []
    const initialYear = moment(valDate).year() || 2019

    for (let i = 0; i < periods; i++){
      periodsArr.push(`FY${i + 1}`)
      yearsArr.push(`${initialYear + i}`)
    }

    setForecastPeriods([...periodsArr])
    setForecastYears([...yearsArr])
  }, [periods, valDate])

  return (
    <div className="flex bg-blue-700 items-center">
      <p className="p-2 w-1/5 font-bold text-white">Forecast Periods: </p>
      <div className="flex-col w-full">
        <div className="flex w-full border-white border-b-2">
          {forecastYears.map((el, index) => 
            <span key={index} className={`p-2 w-1/${periods} text-right font-semibold text-white`}>{el}</span>
          )}
        </div>
        <div className="flex w-full">
          {forecastPeriods.map((el, index) => 
            <span key={index} className={`p-2 w-1/${periods} text-right font-semibold text-white`}>{el}</span>
          )}
        </div>
      </div>
    </div>
  )
}