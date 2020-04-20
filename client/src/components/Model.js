import React, { useReducer, useState } from 'react';
import { axiosBase } from '../utils/utils'
import { DCF } from './DCF/DCF';
import { ForecastInputs } from './DCF/ForecastInputs';
import { GeneralInputs } from './GeneralInputs';
import { initialState, modelReducer } from './Reducers/InputsReducer';
import { ValInputs } from './ValInputs';


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

  

  return (
    <div className="p-8">
      <DCF forecasts={forecasts} periods={inputs.genInputs.periods} inputs={inputs}/>
      <GeneralInputs updateInputs={updateInputs} />
      {Object.keys(inputs.forecasts).map((el, index) =>
        <ForecastInputs periods={inputs.genInputs.periods} updateInputs={updateInputs} key={index} lineItem={el} />
      )}
      <ValInputs updateInputs={updateInputs} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}