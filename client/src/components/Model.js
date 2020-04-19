import React, { useReducer, useState } from 'react';
import { axiosBase } from '../utils/utils'
import { DCF } from './DCF';
import { ForecastInputs } from './ForecastInputs';
import { GeneralInputs } from './GeneralInputs';
import { initialState, modelReducer } from './ForecastsReducer';
import { ValAssumps } from './ValuationInputs';


import { forecasts as dummy } from '../constants'


export const Model = () => {
  const [ inputs, dispatch ] = useReducer(modelReducer, initialState)
  const [ forecasts, setForecasts ] = useState(dummy)

  const updateInputs = (actionType, payload) => {
   dispatch({type: actionType, payload: payload})
  }

  const submitModel = (e) => {
    e.preventDefault()

    axiosBase()
      .post('/api/dcf', inputs)
      .then(res => {
        console.log(res)
        setForecasts(res.data)
        console.log(forecasts)
      })    
  }
  
  console.log(inputs)

  return (
    <div className="p-8">
      <DCF forecasts={forecasts} years={inputs.genInputs.periods} inputs={inputs}/>
      <GeneralInputs updateInputs={updateInputs} />
      {Object.keys(inputs.forecasts).map((el, index) =>
        <ForecastInputs updateInputs={updateInputs} key={index} lineItem={el} />
      )}
      <ValAssumps updateInputs={updateInputs} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}