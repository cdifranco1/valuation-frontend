import React, { useState, useEffect } from 'react'
import moment from 'moment'

export const ForecastYears = ({periods, valDate}) => {
  const [ forecastPeriods, setForecastPeriods ] = useState([])
  const [ forecastYears, setForecastYears ] = useState([])

  useEffect(() => {
    const periodsArr = []
    const yearsArr = []
    const initialYear = moment(valDate).year()

    for (let i = 0; i < periods; i++){
      periodsArr.push(`FY${i + 1}`)
      yearsArr.push(`${initialYear + i}`)
    }

    setForecastPeriods([...periodsArr])
    setForecastYears([...yearsArr])
  }, [periods, valDate])

  return (
    <div className="flex border-black border">
      <p className="text-lg p-2 w-1/5 font-bold self-end">Forecast Periods: </p>
      <div className="flex-col w-full">
        <div className="flex w-full border-black border-b">
          {forecastYears.map(el => 
            <span className={`p-2 w-1/${periods} text-right`}>{el}</span>
          )}
        </div>
        <div className="flex w-full">
          {forecastPeriods.map(el => 
            <span className={`p-2 w-1/${periods} text-right font-bold`}>{el}</span>
          )}
        </div>
      </div>
    </div>
  )
}