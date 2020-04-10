import React, { useState } from 'react';
import { Forecasts } from './Forecasts';
import { ForecastForm } from './ForecastForm';


export const Model = () => {
  const [ projections, setProjections ] = useState({
      revenues: [1000, 1200, 1300, 1400,1500],
      cogs: [400, 500, 600, 700, 800],
      opex: [200, 250, 300, 400, 450],
      wc: [20, 25, 30, 35, 40],
      capex: [30, 40, 45, 60, 70]
  })


  return (
    <div>
      {Object.keys(projections).map(el => 
        <Forecasts key={el} projections={projections[el]} lineItem={el} />
        )}
      {Object.keys(projections).map((el, index) => {
        return <ForecastForm key={index} lineItem={el} />
        }
      )}
    </div>
  )
}